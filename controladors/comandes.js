const ComandaService = require('../serveis/comandes');

async function getAllComandes(req, res) {
  try {
    const userId = res.locals.payload.sub;
    const userType = res.locals.payload.tipus;
    const comandes = await ComandaService.getAllComandesByUser(
      userType,
      userId
    );
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
    const userType = res.locals.payload.tipus;
    const comanda = await ComandaService.getComanda(
      comandaId,
      userType,
      userId
    );
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
    const userType = res.locals.payload.tipus;
    if (userType != 'client')
      return res
        .status(401)
        .send({ message: `No estas autoritzat per a fer aquesta acció` });
    const comandaSaved = await ComandaService.createComanda(req.body, userId);
    return res.status(201).send({ comandaSaved });
  } catch (error) {
    if(error=="404")
      return res.status(404).send({message:"Hi ha un error en la configuració de la comanda que fa que ara mateix no sigui disponible. Torna-ho a provar en uns instants"})
    if(error=="400")
      return res.status(400).send({message:"Has demanat més quantitat de la disponible per aquesta comanda"})
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
    const comandaId = req.params.comandaId;
    const comandaDeleted = await ComandaService.deleteComanda(comandaId);
    return res.status(200).send({ comandaDeleted });
  } catch (error) {
    if (error == '404')
      return res.status(404).send({ message: "No s'ha trobat cap comanda" });
    if(error=='400')
      return res.status(400).send({ message: "No hi ha suficients existències de la comanda" });
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
