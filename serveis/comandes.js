const Comandes = require('../models/comandes.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const OfertaServices = require('../serveis/ofertes');

async function getAllComandesByUser(userType, userId) {
  let comandes =
    userType == 'client'
      ? await Comandes.find({ userId: new ObjectId(userId) }).populate({
          path: 'establimentId',
        })
      : await Comandes.find({ establimentId: new ObjectId(userId) }).populate({
          path: 'userId',
        });
  if (!comandes) throw '404';
  return comandes;
}
async function getAllComandesByOferta(ofertaId) {
  let comandes = await Comandes.find({ ofertaId });
  if (!comandes) throw '404';
  return comandes;
}

async function getComanda(comandaId, userType, userId) {
  let comanda =
    userType == 'client'
      ? await Comandes.find({
          _id: comandaId,
          userId: new ObjectId(userId),
        })
      : await Comandes.find({
          _id: comandaId,
          establimentId: new ObjectId(userId),
        });
  if (!comanda) throw '404';
  return comanda;
}
async function createComanda(comandaInfo, userId) {
  let ofertaParsed = JSON.parse(comandaInfo.oferta);
  comandaInfo = { ...comandaInfo, oferta: ofertaParsed };
  if (
    await OfertaServices.quantitatOferta(
      comandaInfo.establimentId,
      comandaInfo.oferta._id,
      comandaInfo.quantitat
    )
  ) {
    let comanda = new Comandes({
      userId: new ObjectId(userId),
      data: Date.now(),
      ...comandaInfo,
    });
    await OfertaServices.restarQuantitatOferta(
      comandaInfo.establimentId,
      comandaInfo.oferta._id,
      comandaInfo.quantitat
    );
    return await comanda.save();
  }
  throw '404';
}
async function updateComanda(comandaInfo, comandaId, userId) {
  let comanda = await Comandes.findOneAndUpdate(
    { _id: comandaId, userId: new ObjectId(userId) },
    {
      $set: { $: comandaInfo },
    }
  );
  if (!comanda) throw '404';
  return comanda;
}
async function deleteComanda(comandaId) {
  let deleted = await Comandes.findOneAndDelete({ _id: comandaId });
  if (!deleted) throw '404';
  return deleted;
}
async function deleteComandesByUser(userId) {
  let deleted = await Comandes.deleteMany({ userId: new ObjectId(userId) });
  if (!deleted) throw '404';
  return deleted;
}
async function deleteComandesByOferta(ofertaId) {
  let deleted = await Comandes.deleteMany({ ofertaId });
  if (!deleted) throw '404';
  return deleted;
}

module.exports = {
  getAllComandesByUser,
  getAllComandesByOferta,
  getComanda,
  createComanda,
  updateComanda,
  deleteComanda,
  deleteComandesByUser,
  deleteComandesByOferta,
};
