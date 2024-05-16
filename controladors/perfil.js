const PerfilService = require('../serveis/perfil');

async function existeixUsuari(req, res, next) {
  let correu = req.params.correu;
  try {
    let existeix = await PerfilService.existeixUsuari(correu);
    return res
      .status(400)
      .send({ message: 'Existeix un usuari amb aquest correu' });
  } catch (error) {
    if ((error = '404')) return next();
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function existeixEstabliment(req, res) {
  let correu = req.params.correu;
  try {
    let existeix = await PerfilService.existeixEstabliment(correu);
    return res
      .status(400)
      .send({ message: 'Existeix un usuari amb aquest correu' });
  } catch (error) {
    if ((error = '404'))
      return res
        .status(200)
        .send({ message: 'No existeix cap usuari amb aquest correu' });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getPerfil(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    console.log(`UserId: ${userId}, userType:${userType}`);
    let perfil = await PerfilService.getPerfil(userType, userId);
    return res.status(200).send({ perfil });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: `No s'ha trobat l'usuari` });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent: ${err}` });
  }
}

async function updatePerfil(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let userInfo = req.body;
    let perfil = await PerfilService.updatePerfil(userType, userId, userInfo);
    return res.status(200).send({ perfil });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: `No s'ha trobat l'usuari` });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent: ${err}` });
  }
}

async function canviarContrasenya(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let oldC = req.body.oldC;
    let newC = req.body.newC;
    await PerfilService.canviarContrasenya(userType, userId, oldC, newC);
    return res
      .status(200)
      .send({ message: "S'ha canviat la contrasenya correctament." });
  } catch (err) {
    if (err == '401')
      return res
        .status(401)
        .send({ message: 'La contrasenya antiga no és correcta' });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent: ${err}` });
  }
}

module.exports = {
  getPerfil,
  updatePerfil,
  existeixUsuari,
  existeixEstabliment,
  canviarContrasenya,
};
