const Establiments = require('../models/establiments');
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
  'direccio',
];
let esquemaDireccio = ['carrer', 'numero', 'CP', 'poblacio', 'provincia'];

async function getAllEstabliments() {
  return await Establiments.find({});
}

async function getEstabliment(id) {
  let establiment = await Establiments.findOne({ _id: id });
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
    'ofertes.active':true,
    'ofertes.quantitatDisponible':{$gt:0}
  });
  if (!establiments) throw '404';
  return establiments;
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
};
