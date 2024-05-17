const EstablimentsService = require('./establiments');
const Establiments = require('../models/establiments');
const FirebaseService = require('./firebase');

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
async function quantitatOferta(establimentId, ofertaId, quantitat) {
  let establiment = await Establiments.findOne({ _id: establimentId });
  let oferta = establiment.ofertes.id(ofertaId);
  if (!oferta) throw '404';
  return quantitat <= oferta.quantitatDisponible;
}
async function restarQuantitatOferta(establimentId, ofertaId, quantitat) {
  let establimentUpdated = await Establiments.findOneAndUpdate(
    { _id: establimentId, 'ofertes._id': ofertaId },
    {
      $inc: { 'ofertes.$.quantitatDisponible': -quantitat },
    }
  );
  if (!establimentUpdated) throw '404';
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
  let ofertaSaved = await establiment.save();
  let usuarisInteressats =
    await EstablimentsService.getUsuarisQueTenenEstablimentPreferit(
      establimentId
    );
  usuarisInteressats.forEach((el) => {
    FirebaseService.sendMessageToUser(
      el._id,
      'client',
      `S'ha creat una oferta nova`,
      `El teu establiment preferit ${ofertaSaved.nom}, ha creat una oferta nova. Ajuda'l lluitar contra el malbaratament!`
    );
  });
  return ofertaSaved;
}

async function updateOferta(establimentId, ofertaId, ofertaInfo) {
  let updated = await Establiments.findOneAndUpdate(
    { _id: establimentId, 'ofertes._id': ofertaId },
    { $set: { 'ofertes.$': ofertaInfo } }
  );
  let usuarisInteressats =
    await EstablimentsService.getUsuarisQueTenenEstablimentPreferit(
      establimentId
    );
  await usuarisInteressats.forEach(async (el) => {
    await FirebaseService.sendMessageToUser(
      el._id,
      'client',
      `S'ha actualitzat una oferta`,
      `S'ha actualitzat una oferta del teu establiment preferit ${updated.nom}`
    );
  });
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
  quantitatOferta,
  restarQuantitatOferta,
};
