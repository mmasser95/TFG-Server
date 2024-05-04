const AlimentsService = require('../serveis/aliments');

async function getAllAliments(req, res) {
  try {
    let aliments = await AlimentsService.getAllAliments();
    return res.status(200).send({ aliments });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap aliment" });
    return res.status(500).send({ error });
  }
}

async function getAliment(req, res) {
  try {
    let alimentId = req.params.id;
    let aliment = await AlimentsService.getAliment(alimentId);
    return res.status(200).send({ aliment });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap aliment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getAllAlimentsByTipus(req, res) {
  try {
    let tipus = req.params.tipus;
    console.log('tipus :>> ', tipus);
    const aliments = await AlimentsService.getAlimentByTipus(tipus);
    return res.status(200).send({ aliments });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap aliment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getAlimentsByNoms(req, res) {
  try {
    let noms=req.body.noms
    let aliments =await AlimentsService.getAlimentsByNoms(noms)
    return res.status(200).send({aliments})
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap aliment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getAllTipus(req, res) {
  const tipus = await AlimentsService.getTipus();
  return res.status(200).send({ tipus });
}

async function createAliment(req, res) {
  try {
    let alimentSaved = await AlimentsService.createAliment(req.body);
    return res.status(201).send({ alimentSaved });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function updateAliment(req, res) {
  try {
    let alimentId = req.params.id;
    let alimentUpdated = AlimentsService.updateAliment(alimentId, req.body);
    return res.status(200).send({ alimentUpdated });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap aliment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function deleteAliment(req, res) {
  try {
    let alimentId = req.params.id;
    let alimentDeleted = await AlimentsService.deleteAliment(alimentId);
    return res.status(200).send({ alimentDeleted });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap aliment" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

module.exports = {
  getAllAliments,
  getAliment,
  getAllAlimentsByTipus,
  getAlimentsByNoms,
  getAllTipus,
  createAliment,
  updateAliment,
  deleteAliment,
};
