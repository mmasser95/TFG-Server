const EstablimentsService = require('./establiments');
const Establiments = require('../models/establiments');

let esquemaOferta = [
  'nom',
  'preu',
  'descripcio',
  'quantitatDisponible',
  'active',
  'url_imatge',
  'categoria',
];

async function getAllOfertes(establimentId) {
  let establiment = await EstablimentsService.getEstabliment(establimentId);
  return establiment.ofertes;
}
async function getOferta(establimentId, ofertaId) {
  let establiment = await Establiments.findOne({ _id: establimentId });
  let oferta = establiment.ofertes.id(ofertaId);
  if (!oferta) throw '404';
  return oferta;
}

async function getOfertaUser(establimentId, ofertaId) {
  let establiment = await Establiments.findOne({
    _id: establimentId,
    'ofertes.active': true,
  }).select('ofertes');
  let oferta = establiment.ofertes.id(ofertaId);
  if (!oferta) throw '404';
  return oferta;
}

async function createOferta(establimentId, ofertaInfo) {
  let establiment = await EstablimentsService.getEstabliment(establimentId);
  let myOferta = {};
  for (const key of esquemaOferta) {
    myOferta[key] = ofertaInfo[key];
  }
  establiment.ofertes.push(myOferta);
  return await establiment.save();
}

async function updateOferta(establimentId, ofertaId, ofertaInfo) {
  let updated = await Establiments.findOneAndUpdate(
    { _id: establimentId, 'ofertes._id': ofertaId },
    { $set: { 'ofertes.$': ofertaInfo } }
  );
  return updated;
}

async function deleteOferta(establimentId, ofertaId) {
  let deleted = await Establiments.findOneAndUpdate(
    { _id: establimentId },
    { $pull: { ofertes: { _id: ofertaId } } }
  );
  return deleted;
}

module.exports = {
  getAllOfertes,
  getOferta,
  getOfertaUser,
  createOferta,
  updateOferta,
  deleteOferta,
};
