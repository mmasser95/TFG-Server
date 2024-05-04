const Comandes = require('../models/comandes.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const OfertaServices = require('../serveis/ofertes');

async function getAllComandesByUser(userId) {
  let comandes = await Comandes.find({ userId: new ObjectId(userId) }).populate(
    { path: 'establimentId' }
  );
  if (!comandes) throw '404';
  return comandes;
}
async function getAllComandesByOferta(ofertaId) {
  let comandes = await Comandes.find({ ofertaId });
  if (!comandes) throw '404';
  return comandes;
}
async function getComanda(comandaId, userId) {
  let comanda = await Comandes.find({
    _id: comandaId,
    userId: new ObjectId(userId),
  });
  if (!comanda) throw '404';
  return comanda;
}
async function createComanda(comandaInfo, userId) {
  console.log(userId);
  if (
    OfertaServices.quantitatOferta(
      comandaInfo.establimentId,
      comandaInfo.ofertaId,
      comandaInfo.quantitat
    )
  ) {
    let comanda = new Comandes({
      userId: new ObjectId(userId),
      data: Date.now(),
      ...comandaInfo,
    });
    OfertaServices.restarQuantitatOferta(
      comandaInfo.establimentId,
      comandaInfo.ofertaId,
      comandaInfo.quantitat
    );
    return await comanda.save();
  }
  throw '400';
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
