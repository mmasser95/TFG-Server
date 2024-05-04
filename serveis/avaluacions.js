const Establiments = require('../models/establiments');
const EstablimentsService = require('../serveis/establiments');

const Comandes = require('../models/comandes');

async function getAllAvaluacions2(establimentId) {
  let establiment = await Establiments.findOne({ _id: establimentId });

  if (!establiment.avaluacions) throw '404';
  return establiment.avaluacions;
}

async function getAllAvaluacions(establimentId) {
  let avaluacions = await Comandes.find({
    establimentId,
  }).select('avaluacio');
  if (!avaluacions) throw '404';
  return avaluacions;
}

async function getAvaluacio(comandaId,userId) {
  let avaluacio=await Comandes.findOne({
    _id:comandaId,
    userId
  }).select('avaluacio')
  if(!avaluacio) throw'404'
  return avaluacio
}

async function createAvaluacio2(establimentId, userId, avaluacioInfo) {
  let establiment = await EstablimentsService.getEstabliment(establimentId);
  let myAvaluacio = {
    userId,
    ...avaluacioInfo,
  };
  establiment.avaluacions.push(myAvaluacio);
  return await establiment.save();
}

async function createAvaluacio(comandaId, userId, avaluacioInfo) {
  let comanda = await Comandes.findOneAndUpdate(
    {
      _id: comandaId,
      userId,
    },
    {
      $set: {
        avaluacio: avaluacioInfo,
      },
    }
  );
  if (!comanda) throw '404';
  return comanda;
}

async function updateAvaluacio2(
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

async function updateAvaluacio(comandaId, userId, avaluacioInfo) {
  let updated = await Comandes.findOneAndUpdate(
    { _id: comandaId, userId },
    {
      $set: {
        avaluacio: avaluacioInfo,
      },
    }
  );
  if (!updated) throw '404';
  return updated;
}

async function deleteAvaluacio2(establimentId, userId, avaluacioId) {
  let deleted = await Establiments.findOneAndUpdate(
    { _id: establimentId },
    { $pull: { avaluacions: { _id: avaluacioId, userId: userId } } }
  );
  if (!deleted) throw '404';
  return deleted;
}

async function deleteAvaluacio(comandaId, userId) {
  let deleted = await Comandes.findOneAndUpdate(
    { _id: comandaId, userId },
    { $unset: { avaluacio: '' } }
  );
  if (!deleted) throw '404';
  return deleted;
}

module.exports = {
  getAllAvaluacions,
  getAvaluacio,
  createAvaluacio,
  updateAvaluacio,
  deleteAvaluacio,
};
