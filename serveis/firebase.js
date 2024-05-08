const Users = require('../models/user');
const Establiments = require('../models/establiments');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

const admin = require('firebase-admin');
const serviceAccount = require('../firebase.private.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function sendMessageToUser(userId, userType, title, body) {
  const model = userType == 'client' ? Users : Establiments;
  const usuari = await model.findOne({ _id: userId }).select('deviceTokens');
  if (!usuari || !usuari.deviceTokens) throw '404';
  usuari.deviceTokens.forEach((token) =>
    admin.messaging().send({ notification: { title, body }, token })
  );

  return usuari;
}

async function addTokenOfDevice(userId, userType, token) {
  const model = userType == 'client' ? Users : Establiments;
  console.log('token :>> ', token);
  const usuari = await model.findOneAndUpdate(
    { _id: userId },
    {
      $addToSet: {
        deviceTokens: token,
      },
    }
  );
  if (!usuari) throw '404';
  return usuari;
}

async function deleteTokenOfDevice(userId, userType, token) {
  const model = userType == 'client' ? Users : Establiments;
  const usuari = await model.findOneAndUpdate(
    { _id: userId },
    {
      $pull: {
        deviceTokens: token,
      },
    }
  );
  if (!usuari) throw '404';
  return usuari;
}

async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      '981593687954-d0h9henugkvditar81b2jdmuo7o1rgum.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();
  let usuari = await Users.findOne({ correu: payload.email });
  if (!usuari) {
    usuari = new Users({
      correu: payload.email,
      nom: payload.given_name,
      cognoms: payload.family_name,
      contrasenya: payload.sub,
    });
    usuari = await usuari.save();
  }
  return usuari;
}
module.exports = {
  addTokenOfDevice,
  deleteTokenOfDevice,
  sendMessageToUser,
  verifyGoogleToken,
};
