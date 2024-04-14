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
];

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
      userType:'establiment'
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
  return await establiment.save();
}

async function deleteEstabliment(id) {
  let establiment = await getEstabliment(id);
  return await establiment.remove();
}

async function updateDireccio(id,direccioInfo){
    let establiment=await getEstabliment(id);
    establiment.direccio=direccioInfo;
    return await establiment.save()
}

module.exports = {
  getAllEstabliments,
  getEstabliment,
  loginEstabliment,
  signInEstabliment,
  updateEstabliment,
  deleteEstabliment,
  updateDireccio
};
