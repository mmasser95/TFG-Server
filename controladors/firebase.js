const FirebaseService = require('../serveis/firebase');
const TokenService = require('../serveis/token');

async function addDeleteTokenOfDevice(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let mode = req.body.mode;
    let token = req.body.token;
    console.log(token);
    let usuari =
      mode == 'add'
        ? await FirebaseService.addTokenOfDevice(userId, userType, token)
        : await FirebaseService.deleteTokenOfDevice(userId, userType, token);
    return res.status(200).send({ usuari });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    console.log(err);
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent: ${err}` });
  }
}

async function testFCM(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    /*let usuari = await FirebaseService.sendMessageToUser(
      userId,
      userType,
      'Prova',
      'PROOOOOOOOOOOOOOVAA'
    );*/
    return res.status(200).send({ message: 'funciona' });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent: ${err}` });
  }
}
async function googleLogin(req, res) {
  try {
    let credential = req.body.credential;
    let usuari = await FirebaseService.verifyGoogleToken(credential);
    let token = await TokenService.createToken(usuari, false);
    return res
      .status(200)
      .send({ token, userId: usuari._id, userType: 'client' });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent: ${err}` });
  }
}
module.exports = { addDeleteTokenOfDevice, testFCM, googleLogin };
