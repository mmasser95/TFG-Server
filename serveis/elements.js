const Users = require('../models/user');
const Establiments = require('../models/establiments');

async function getAllElements(userId, userType, rebostId) {
  let model = userType == 'client' ? Users : Establiments;
  let user = await model
    .findOne({ _id: userId, rebosts: { $elemMatch: { _id: rebostId } } })
    .populate({
      path: 'rebosts',
      populate: {
        path: 'elements',
        populate: {
          path: 'aliment',
          model: 'Aliments',
        },
      },
    });
  let rebost = user.rebosts.id(rebostId);
  return rebost.elements;
}

async function getElement(userId, userType, rebostId, elementId) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId });
  if (!usuari) throw '404';
  let rebost = usuari.rebosts.id(rebostId);
  if (!rebost) throw '404';
  let element = rebost.elements.id(elementId);
  if (!element) throw '404';
  await element.populate({ path: 'aliment', model: 'Aliment' });
  return element;
}

async function createElement(userId, userType, rebostId, elementInfo) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId });
  if (!usuari) throw '404';
  let rebost = usuari.rebosts.id(rebostId);
  if (!rebost) throw '404';
  rebost.elements.push(elementInfo);
  return usuari.save();
}

async function putElement(userId, userType, rebostId, elementId, elementInfo) {
  let model = userType == 'client' ? Users : Establiments;
  let updated = await model.findOneAndUpdate(
    { _id: userId, 'rebosts._id': rebostId, 'rebosts.elements._id': elementId },
    { $set: { 'rebosts.$[outer].elements.$[inner]': elementInfo } },
    { arrayFilters: [{ 'outer._id': rebostId }, { 'inner._id': elementId }] }
  );
  return updated;
}

async function deleteElement(userId, userType, rebostId, elementId) {
  let model = userType == 'client' ? Users : Establiments;
  let deleted = await model.findOneAndUpdate(
    { _id: userId },
    {
      $pull: { 'rebosts.$[outer].elements': { _id: elementId } },
    },
    { arrayFilters: [{ 'outer._id': rebostId }] }
  );
  return deleted;
}

module.exports = {
  getAllElements,
  getElement,
  createElement,
  putElement,
  deleteElement,
};
