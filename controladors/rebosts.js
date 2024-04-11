const RebostsService = require('../serveis/rebosts');
const Rebosts = require('../models/rebosts');

async function getAllRebosts(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebosts = await RebostsService.getAllRebosts(userId, userType);
    return res.status(200).send({ rebosts });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap rebost" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getRebost(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.id;
    const rebost = await RebostsService.getRebost(userId, userType, rebostId);
    return res.status(200).send({ rebost });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap rebost" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function createRebost(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let post = req.body;
    const rebostSaved = await RebostsService.createRebost(
      userId,
      userType,
      post
    );
    return res.status(200).send({ rebostSaved });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function updateRebost(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.id;
    let post = req.body;
    const rebostUpdated = await RebostsService.updateRebost(
      userId,
      userType,
      rebostId,
      post
    );
    return res.status(200).send({ rebostUpdated });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function deleteRebost(req, res) {
  try {
    let userId = res.locals.payload.sub;
    let userType = res.locals.payload.tipus;
    let rebostId = req.params.id;
    const rebostDeleted = await RebostsService.deleteRebost(
      userId,
      userType,
      rebostId
    );
    return res.status(200).send({ rebostDeleted });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap rebost" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

module.exports = {
  getAllRebosts,
  getRebost,
  createRebost,
  updateRebost,
  deleteRebost,
};
