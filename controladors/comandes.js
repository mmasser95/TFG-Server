const ComandaService = require('../serveis/comandes');

async function getAllComandes(req, res) {
  try {
    const userId = res.locals.payload.sub;
    const comandes = await ComandaService.getAllComandesByUser(userId);
    return res.status(200).send({ comandes });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap comanda" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getComanda(req, res) {
  try {
    const comandaId = req.params.comandaId;
    const userId = res.locals.payload.sub;
    const comanda = await ComandaService.getComanda(comandaId, userId);
    return res.status(200).send({ comanda });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap comanda" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function createComanda(req, res) {
  try {
    const userId = res.locals.payload.sub;
    const comandaSaved = await ComandaService.createComanda(req.body, userId);
    return res.status(201).send({ comandaSaved });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function updateComanda(req, res) {
  try {
    req.body.data = parse(req.body.data, 'dd/MM/yyyy', new Date());
  } catch (err) {
    return res
      .status(400)
      .send({ message: `Ha sorgit un error formatant la data` });
  }
  try {
    const userId = res.locals.payload.sub;
    const comandaId = req.params.comandaId;
    const comandaUpdated = await ComandaService.updateComanda(
      req.body,
      comandaId,
      userId
    );
    return res.status(200).send({ comandaUpdated });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap comanda" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function deleteComanda(req, res) {
  try {
    const comandaId=req.params.comandaId
    const comandaDeleted = await ComandaService.deleteComanda(comandaId);
    return res.status(200).send({ comandaDeleted });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap comanda" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}
module.exports = {
  getAllComandes,
  getComanda,
  createComanda,
  updateComanda,
  deleteComanda,
};
