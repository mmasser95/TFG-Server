const Establiments = require('../models/establiments');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt-node');
const Token = require('./token');

let esquemaEstabliment = [
  'nom',
  'descripcio',
  'correu',
  'contrasenya',
  'telf',
  'tipus',
  'web',
  'url_imatge',
  'url_fondo',
  'direccio',
  'horari',
];
let esquemaDireccio = ['carrer', 'numero', 'CP', 'poblacio', 'provincia'];

async function getAllEstabliments() {
  return await Establiments.find({});
}

async function getEstabliment(id) {
  let establiment = await Establiments.findOne({ _id: id }).select(
    '_id nom descripcio horari tipus telf web packs_salvats direccio coordenades ofertes avaluacions url_imatge url_fondo'
  );
  if (!establiment) throw '404';
  return establiment;
}

async function loginEstabliment(correu, contrasenya) {
  let query = Establiments.findOne({ correu });
  query.select('correu nom contrasenya _id');
  let establiment = await query.exec();
  if (!establiment) throw '401';
  let loginInfo = {};
  if (bcrypt.compareSync(contrasenya, establiment.contrasenya)) {
    loginInfo = {
      token: Token.createToken(establiment, true),
      userId: establiment._id,
      userType: 'establiment',
    };
    return loginInfo;
  }
  throw '401';
}

async function signInEstabliment(establimentInfo) {
  let myInfo = {};
  for (const key of esquemaEstabliment) {
    myInfo[key] = establimentInfo[key];
  }
  /*for (const key of esquemaDireccio) {
    myInfo['direccio'][key] = establimentInfo['direccio'][key];
  }*/
  myInfo['coordenades'] = [establimentInfo.latitude, establimentInfo.longitude];
  let establiment = new Establiments({ ...myInfo });
  return await establiment.save();
}

async function updateEstabliment(id, establimentInfo) {
  let establiment = await getEstabliment(id);
  for (const key of esquemaEstabliment) {
    if (Object.hasOwnProperty.call(establimentInfo, key)) {
      if (establimentInfo[key] != '') establiment[key] = establimentInfo[key];
    }
  }
  /*for (const key of esquemaDireccio) {
    if (establimentInfo['key'] != '')
      establiment['direccio'][key] = establimentInfo['direccio'][key];
  }*/
  return await establiment.save();
}

async function deleteEstabliment(id) {
  let deleted = await Establiments.findOneAndDelete({ _id: id });
  if (!deleted) throw '404';
  return deleted;
}

async function updateDireccio(id, direccioInfo) {
  let establiment = await getEstabliment(id);
  establiment.direccio = direccioInfo;
  return await establiment.save();
}

async function searchEstabliments(coordenades, radi) {
  let establiments = await Establiments.find({
    coordenades: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: coordenades,
        },
        $maxDistance: radi * 1000,
      },
    },
    'ofertes.active': true,
    'ofertes.quantitatDisponible': { $gt: 0 },
  }).select(
    '_id nom descripcio horari tipus telf web packs_salvats coordenades ofertes avaluacions url_imatge url_fondo'
  );
  if (!establiments) throw '404';
  return establiments;
}

async function searchEstabliments2(
  coordenades,
  radi,
  preuMin,
  preuMax,
  tipus_establiment
) {
  let pipeline = [];
  pipeline.push({
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: coordenades,
      },
      maxDistance: radi * 1000,
      spherical: true,
      distanceField: 'distance',
    },
  });

  pipeline.push({
    $match: {
      'ofertes.active': true,
      'ofertes.quantitatDisponible': { $gt: 0 },
    },
  });

  pipeline.push({
    $project: {
      _id: 1,
      nom: 1,
      ofertes: 1,
      descripcio: 1,
      telf: 1,
      horari: 1,
      tipus: 1,
      telf: 1,
      web: 1,
      packs_salvats: 1,
      direccio: 1,
      ofertes: 1,
    },
  });

  let establiments = await Establiments.aggregate(pipeline);
  if (!establiments) throw '404';
  return establiments;
}

async function actualitzarContrasenya(
  establimentId,
  contrasenyaAntiga,
  contrasenyaNova
) {
  let query = Establiments.findOne({ _id: establimentId });
  query.select('contrasenya _id');
  let establiment = await query.exec();
  if (!establiment) throw '404';
  if (!bcrypt.compareSync(contrasenyaAntiga, establiment.contrasenya))
    throw '401';
  let establimentUpdated = await Establiments.findOneAndUpdate(
    { _id: establimentId },
    { contrasenya: contrasenyaNova }
  );
  return establimentUpdated;
}

async function getEstadistiques(establimentId) {
  let estadistiques = await Establiments.aggregate([
    {
      $match: {
        _id: new ObjectId(establimentId),
      },
    },
    {
      $unwind: '$avaluacions', // Desdobla el array 'avaluacions' para poder sumar las evaluaciones de calidad de cada elemento
    },
    {
      $group: {
        _id: '$_id', // Agrupa por el ID del establecimiento
        sumaQualitat: {
          $avg: '$avaluacions.qualitat', // Suma las evaluaciones de calidad
        },
        sumaQuantitat: {
          $avg: '$avaluacions.quantitat', // Suma las evaluaciones de calidad
        },
      },
    },
  ]);
  if (!estadistiques) throw '404';
  return estadistiques;
}

module.exports = {
  getAllEstabliments,
  getEstabliment,
  loginEstabliment,
  signInEstabliment,
  updateEstabliment,
  deleteEstabliment,
  updateDireccio,
  searchEstabliments,
  searchEstabliments2,
  actualitzarContrasenya,
  getEstadistiques,
};
