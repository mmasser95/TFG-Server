const Users = require('../models/user');
const Establiments = require('../models/establiments');
const bcrypt = require('bcrypt-node');
async function existeixUsuari(correu) {
  let usuari = await Users.findOne({ correu });
  if (!usuari) throw '404';
  return true;
}
async function existeixEstabliment(correu) {
  let usuari = await Establiments.findOne({ correu });
  if (!usuari) throw '404';
  return true;
}

async function getPerfil(userType, userId) {
  let model = userType == 'client' ? Users : Establiments;
  let selectString =
    userType == 'client'
      ? 'correu nom cognoms telf data_naixement'
      : 'nom correu descripcio tipus telf web url_imatge url_fondo horari direccio';
  let usuari = await model.findOne({ _id: userId }).select(selectString);
  if (!usuari) throw '404';
  return usuari;
}

async function updatePerfil(userType, userId, userInfo) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOneAndUpdate({ _id: userId }, { ...userInfo });
  if (!usuari) throw '404';
  return usuari;
}

async function canviarContrasenya(userType,userId,oldC,newC){
  let model=userType=='client'?Users:Establiments;
  let usuari=await model.findOne({_id:userId}).select('contrasenya')
  bcrypt.compare(oldC,usuari.contrasenya,async (err,res)=>{
    if(err) throw err
    if(!res) throw '401'
    await model.findOneAndUpdate({_id:userId},{contrasenya:newC})
  })
}

module.exports = {
  getPerfil,
  updatePerfil,
  existeixUsuari,
  existeixEstabliment,
  canviarContrasenya,
};
