const ElementsService = require('../serveis/elements');
async function getAllElements(req, res) {
  try {
    let userId = res.locals.payload.sub;
    console.log(userId);
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.rebostId;
    let elements = await ElementsService.getAllElements(
      userId,
      userType,
      rebostId
    );
    return res.status(200).send({ elements });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap element" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getElement(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.rebostId;
    let elementId = req.params.elementId;
    let element = await ElementsService.getElement(
      userId,
      userType,
      rebostId,
      elementId
    );
    return res.status(200).send({ element });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap element" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function createElement(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.rebostId;
    let elementInfo = req.body;
    let userSaved = await ElementsService.createElement(
      userId,
      userType,
      rebostId,
      elementInfo
    );
    return res.status(201).send({ userSaved });
  } catch (error) {
    if (error == '404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap usuari o rebost" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function createElementScan(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.rebostId;
    let userSaved = await ElementsService.createElementScan(
      userId,
      userType,
      rebostId,
      req.body.elements
    );
    return res.status(201).send({ userSaved });
  } catch (error) {
    if (error == '404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap usuari o rebost" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function updateElement(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.rebostId;
    let elementId = req.params.elementId;
    let elementInfo = req.body;
    let elementUpdated = await ElementsService.putElement(
      userId,
      userType,
      rebostId,
      elementId,
      elementInfo
    );
    if (!elementUpdated)
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap usuari,rebost o element" });
    return res.status(200).send({ elementUpdated });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function deleteElement(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.rebostId;
    let elementId = req.params.elementId;
    let elementDeleted = await ElementsService.deleteElement(
      userId,
      userType,
      rebostId,
      elementId
    );
    if (!elementDeleted)
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap usuari,rebost o element" });
    return res.status(200).send({ message: 'Not implemented' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

module.exports = {
  getAllElements,
  getElement,
  createElement,
  createElementScan,
  updateElement,
  deleteElement,
};
