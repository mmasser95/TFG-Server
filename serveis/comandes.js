const Comandes = require('../models/comandes.js');

async function getAllComandesByUser(userId) {
  let comandes = await Comandes.find({ userId });
  if (!comandes) throw '404';
  return comandes;
}
async function getAllComandesByOferta(ofertaId) {
  let comandes = await Comandes.find({ ofertaId });
  if (!comandes) throw '404';
  return comandes;
}
async function createComanda(comandaInfo) {
  let comanda = new Comandes(comandaInfo);
  return await comanda.save();
}
async function updateComanda() {}
async function deleteComanda(comandaId) {
  let deleted = await Comandes.findOneAndDelete({ _id: comandaId });
  if (!deleted) throw '404';
  return deleted;
}
async function deleteComandesByUser(userId) {
  let deleted = await Comandes.deleteMany({ userId });
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
  createComanda,
  updateComanda,
  deleteComanda,
  deleteComandesByUser,
  deleteComandesByOferta,
};
