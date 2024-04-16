const Token = require('../serveis/token.js');
const UserService = require('../serveis/users');

async function postUser(req, res) {
  try {
    user = UserService.signInUser(req.body);
    return res
      .status(200)
      .send({ userSaved: user, message: 'Usuari registrat correctament!' });
  } catch (err) {
    return res.status(500).send(`Ha sorgit l'error següent ${err}`);
  }
}

async function getUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

async function logIn(req, res, next) {
  let post = req.body;
  try {
    loginInfo = await UserService.loginUser(post.correu, post.contrasenya);
    return res.status(200).send({
      ...loginInfo,
      message: 'Login correcte!',
    });
  } catch (err) {
    if (err == '404') return next();
    if (err == '401')
      return res.status(401).send({ message: 'Login incorrecte' });
    return res.status(500).send({ message: `Error ${err}` });
  }
}

async function getMyUser(req, res) {
  let user_id = res.locals.payload.sub;
  try {
    let user = await UserService.getUser(user_id);
    return res.status(200).send({ user });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res.status(500).send({ message: `Error ${err}` });
  }
}

function verificarTokenUsuari(req, res) {
  let post = req.body;
  Token.decodeToken(post.token)
    .then((result) => {
      return res.status(200).send({
        token: Token.createToken({ _id: result.sub }),
        user_id: result.sub,
        message: 'Token renovat',
      });
    })
    .catch((err) => {
      return res.status(err.status).send(err.message);
    });
}

async function deleteUser(req, res) {
  let userId = res.locals.payload.sub;
  try {
    let userDeleted = await UserService.deleteUser(userId);
    return res.status(200).send({ userDeleted });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res.status(500).send({ message: `Error ${err}` });
  }
}

async function getPreferits(req, res) {
  let userId = res.locals.payload.sub;
  try {
    let preferits = await UserService.getPreferits(userId);
    return res.status(200).send({ preferits });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res.status(500).send({ message: `Error ${err}` });
  }
}

async function marcarPreferit(req, res) {
  let userId = res.locals.payload.sub;
  try {
    let establimentId = req.body.establimentId;
    let preferit = await UserService.marcarPreferit(userId, establimentId);
    return res.status(200).send({ preferit });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res.status(500).send({ message: `Error ${err}` });
  }
}

async function desmarcarPreferit(req, res) {
  let userId = res.locals.payload.sub;
  try {
    let establimentId = req.body.establimentId;
    let preferitDeleted = await UserService.desmarcarPreferit(
      userId,
      establimentId
    );
    return res.status(200).send({ preferitDeleted });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res.status(500).send({ message: `Error ${err}` });
  }
}

async function actualitzarContrasenya(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let contrasenyaNova = req.body.contrasenya;
    let contrasenyaAntiga = req.body.contrasenyaAntiga;
    let userUpdated = await UserService.actualitzarContrasenya(
      userId,
      contrasenyaAntiga,
      contrasenyaNova
    );
    return res.status(200).send({ userUpdated });
  } catch (err) {
    if (err == '401')
      return res
        .status(401)
        .send({ message: 'La contrasenya introduida no es correcta' });
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${err}` });
  }
}

module.exports = {
  postUser,
  getUsers,
  logIn,
  getMyUser,
  verificarTokenUsuari,
  deleteUser,
  getPreferits,
  marcarPreferit,
  desmarcarPreferit,
  actualitzarContrasenya,
};
