const AvaluacionsService = require('../serveis/avaluacions');

async function getAllAvaluacions(req, res) {
  try {
    let establimentId = req.params.establimentId;
    let avaluacions = await AvaluacionsService.getAllAvaluacions(establimentId);
    console.log('avaluacions :>> ', avaluacions);
    return res.status(200).send({ avaluacions });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: `No s'han trobat avaluacions` });
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

async function getAvaluacio(req, res) {
  try {
    let comandaId = req.params.comandaId;
    let userId = res.locals.payload.sub;
    let avaluacio = await AvaluacionsService.getAvaluacio(comandaId, userId);
    return res.status(200).send({ avaluacio });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: `No s'han trobat avaluacions` });
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

async function createAvaluacio(req, res) {
  let userId = res.locals.payload.sub;
  let userType = res.locals.payload.tipus;
  let comandaId = req.params.comandaId;
  let avaluacioInfo = req.body;
  if (userType == 'establiment')
    return res.status(401).send({ message: 'No estas autoritzat' });
  try {
    let avaluacioSaved = await AvaluacionsService.createAvaluacio(
      comandaId,
      userId,
      avaluacioInfo
    );
    return res
      .status(200)
      .send({ avaluacioSaved, message: 'Avaluació creada' });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: `No s'han trobat establiments` });
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

async function updateAvaluacio(req, res) {
  let userId = res.locals.payload.sub;
  let userType = res.locals.payload.tipus;
  let comandaId = req.params.comandaId;
  let avaluacioInfo = req.body;
  if (userType == 'establiment')
    return res.status(401).send({ message: 'No estas autoritzat' });
  try {
    let avaluacioUpdated = await AvaluacionsService.updateAvaluacio(
      comandaId,
      userId,
      avaluacioInfo
    );
    return res
      .status(200)
      .send({ avaluacioUpdated, message: 'Avaluació actualitzada' });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: `No s'ha trobat l'avaluacio` });
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

async function deleteAvaluacio(req, res) {
  let userId = res.locals.payload.sub;
  let userType = res.locals.payload.tipus;
  let comandaId = req.params.comandaId;
  if (userType == 'establiment')
    return res.status(401).send({ message: 'No estas autoritzat' });
  try {
    let avaluacioDeleted = await AvaluacionsService.deleteAvaluacio(
      comandaId,
      userId
    );
    return res
      .status(200)
      .send({ message: `S'ha eliminat correctament`, avaluacioDeleted });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: `No s'ha trobat l'avaluacio` });
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

module.exports = {
  getAllAvaluacions,
  getAvaluacio,
  createAvaluacio,
  updateAvaluacio,
  deleteAvaluacio,
};
