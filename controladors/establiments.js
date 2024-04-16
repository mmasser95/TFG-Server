const EstablimentsService = require('../serveis/establiments');
const uploadManager = require('../middlewares/files');

async function getAllEstabliments(req, res) {
  try {
    const establiments = await EstablimentsService.getAllEstabliments();
    return res.status(200).send({ establiments });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getEstabliment(req, res) {
  try {
    const establiment = await EstablimentsService.getEstabliment(req.params.id);
    return res.status(200).send({ establiment });
  } catch (error) {
    if ((error = '404'))
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap establiment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function createEstabliment(req, res) {
  try {
    if (req.file) req.body.url_imatge = req.file.path;
    const establimentSaved = await EstablimentsService.signInEstabliment(
      req.body
    );
    return res.status(200).send({ establimentSaved });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function updateEstabliment(req, res) {
  try {
    if (req.file) req.body.url_imatge = req.file.path;
    let establimentId = res.locals.payload.sub;
    const establimentUpdated = await EstablimentsService.updateEstabliment(
      establimentId,
      req.body
    );
    return res.status(200).send({ establimentUpdated });
  } catch (error) {
    if (error == '404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap establiment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function deleteEstabliment(req, res) {
  try {
    let establimentId = res.locals.payload.sub;
    const establimentDeleted = await EstablimentsService.deleteEstabliment(
      establimentId
    );
    return res.status(200).send({ establimentDeleted });
  } catch (error) {
    if (error == '404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap establiment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function searchEstabliments(req, res) {
  try {
    let coordenades = [req.body.latitude, req.body.longitude];
    let radi = req.body.radi;
    let establiments = await EstablimentsService.searchEstabliments(
      coordenades,
      radi
    );
    return res.status(200).send({ establiments });
  } catch (error) {
    if (error == '404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap establiment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function login(req, res) {
  let post = req.body;
  try {
    let info = await EstablimentsService.loginEstabliment(
      post.correu,
      post.contrasenya
    );
    return res.status(200).send({
      ...info,
      message: 'Login correcte',
    });
  } catch (err) {
    if (err == '401')
      return res
        .status(401)
        .send({ message: 'Correu o contrasenya incorrectes' });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${err}` });
  }
}

async function updateDireccio(req, res) {
  let post = req.body;
  let establimentId = res.locals.payload.sub;
  let userType = res.locals.payload.tipus;
  if (userType == 'client')
    return res.status(401).send({ message: 'No estas autoritzat' });
  try {
    let establimentUpdated = await EstablimentsService.updateDireccio(
      establimentId,
      post
    );
    return res
      .status(200)
      .send({ message: 'Direcció actualitzada', establimentUpdated });
  } catch (err) {
    if (error == '404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap establiment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

module.exports = {
  getAllEstabliments,
  getEstabliment,
  createEstabliment,
  updateEstabliment,
  deleteEstabliment,
  login,
  updateDireccio,
  searchEstabliments,
};
