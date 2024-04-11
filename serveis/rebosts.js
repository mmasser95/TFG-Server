const Establiments = require('../models/establiments');
const Users = require('../models/user');

async function getAllRebosts(userId, userType) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId });
  return usuari.rebosts;
}

async function getRebost(userId, userType, rebostId) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId });
  let rebost = usuari.rebosts.id(rebostId);
  if (!rebost) throw '404';
  return rebost;
}

async function createRebost(userId, userType, rebostInfo) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId });
  usuari.rebosts.push(rebostInfo);
  return await usuari.save();
}

async function updateRebost(userId, userType, rebostId, rebostInfo) {
  let model = userType == 'client' ? Users : Establiments;
  let updated = await model.findOneAndUpdate(
    { _id: userId, 'rebosts._id': rebostId },
    { $set: { 'rebosts.$': rebostInfo } }
  );
  return updated;
}

async function deleteRebost(userId, userType, rebostId) {
  let model = userType == 'client' ? Users : Establiments;
  let deleted = await model.findOneAndUpdate(
    { _id: userId },
    { $pull: { rebosts: { _id: rebostId } } }
  );
  if(!deleted) throw'404'
  return deleted;
}

module.exports = {
  getAllRebosts,
  getRebost,
  createRebost,
  updateRebost,
  deleteRebost,
};
