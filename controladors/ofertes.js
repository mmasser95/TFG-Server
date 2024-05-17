const OfertesService = require('../serveis/ofertes');
const uploadManager = require('../middlewares/files');

async function getAllOfertes(req, res) {
  try {
    let ofertes = await OfertesService.getAllOfertes(res.locals.payload.sub);
    return res.status(200).send({ ofertes });
  } catch (error) {
    if (error == '404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap oferta disponible" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getOferta(req, res) {
  try {
    let oferta = await OfertesService.getOferta(
      res.locals.payload.sub,
      req.params.id
    );
    return res.status(200).send({ oferta });
  } catch (error) {
    if (error=='404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap oferta disponible" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function getOfertaUser(req,res){
  try {
    let oferta = await OfertesService.getOfertaUser(
      req.params.establimentId,
      req.params.id
    );
    return res.status(200).send({ oferta });
  } catch (error) {
    if (error=='404')
      return res
        .status(404)
        .send({ message: "No s'ha trobat cap oferta disponible" });
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function createOferta(req, res) {
  try {
    if (req.file) req.body.url_imatge = req.file.path;
    const ofertaSaved = await OfertesService.createOferta(
      res.locals.payload.sub,
      req.body
    );
    return res.status(201).send({ ofertaSaved });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function updateOferta(req, res) {
  try {
    let body={}
    if (req.file) {
      body={...req.body, url_imatge:req.file.path};
    }else{
      body=req.body
    }
    console.log(body)
    let ofertaUpdated = await OfertesService.updateOferta(
      res.locals.payload.sub,
      req.params.id,
      body
    );
    return res.status(200).send({ ofertaUpdated });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

async function deleteOferta(req, res) {
  try {
    let deleted = await OfertesService.deleteOferta(
      res.locals.payload.sub,
      req.params.id
    );
    return res.status(200).send({ deletedOferta: deleted });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${error}` });
  }
}

module.exports = {
  getAllOfertes,
  getOferta,
  getOfertaUser,
  createOferta,
  updateOferta,
  deleteOferta,
};
