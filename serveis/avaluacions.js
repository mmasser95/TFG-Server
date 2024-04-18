const Establiments = require('../models/establiments');
const EstablimentsService = require('../serveis/establiments');

async function getAllAvaluacions(establimentId) {
  let establiment = await Establiments.findOne({_id:establimentId})
  
  if (!establiment.avaluacions) throw '404';
  return establiment.avaluacions;
}

async function createAvaluacio(establimentId, userId, avaluacioInfo) {
  let establiment = await EstablimentsService.getEstabliment(establimentId);
  let myAvaluacio = {
    userId,
    ...avaluacioInfo,
  };
  establiment.avaluacions.push(myAvaluacio);
  return await establiment.save();
}

async function updateAvaluacio(
  establimentId,
  userId,
  avaluacioId,
  avaluacioInfo
) {
  let updated = await Establiments.findOneAndUpdate(
    {
      _id: establimentId,
      'avaluacions._id': avaluacioId,
      'avaluacions.userId': userId,
    },
    { $set: { 'avaluacions.$': avaluacioInfo } }
  );
  if (!updated) throw '404';
  return updated;
}

async function deleteAvaluacio(establimentId, userId, avaluacioId) {
  let deleted = await Establiments.findOneAndUpdate(
    { _id: establimentId },
    { $pull: { avaluacions: { _id: avaluacioId, userId: userId } } }
  );
  if (!deleted) throw '404';
  return deleted;
}

module.exports = {
  getAllAvaluacions,
  createAvaluacio,
  updateAvaluacio,
  deleteAvaluacio,
};
