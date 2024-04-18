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

async function createAvaluacio(req, res) {
  let userId = res.locals.payload.sub;
  let userType = res.locals.payload.tipus;
  let establimentId = req.params.establimentId;
  let avaluacioInfo = req.body;
  if (userType == 'establiment')
    return res.status(401).send({ message: 'No estas autoritzat' });
  try {
    let avaluacioSaved = await AvaluacionsService.createAvaluacio(
      establimentId,
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
  let establimentId = req.params.establimentId;
  let avaluacioId = req.params.avaluacioId;
  let avaluacioInfo = req.body;
  if (userType == 'establiment')
    return res.status(401).send({ message: 'No estas autoritzat' });
  try {
    let avaluacioUpdated = await AvaluacionsService.updateAvaluacio(
      establimentId,
      userId,
      avaluacioId,
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
  let establimentId = req.params.establimentId;
  let avaluacioId = req.params.avaluacioId;
  if (userType == 'establiment')
    return res.status(401).send({ message: 'No estas autoritzat' });
  try {
    let avaluacioDeleted = await AvaluacionsService.deleteAvaluacio(
      establimentId,
      userId,
      avaluacioId
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
  createAvaluacio,
  updateAvaluacio,
  deleteAvaluacio,
};
