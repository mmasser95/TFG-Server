const Avaluacio = require('../models/avaluacio');

export async function getAllAvaluacionsOfEstabliment(req, res) {
  let establimentId = req.params.establimentId;
  try {
    let avaluacions = await Avaluacio.find({ establimentId });
    if (!avaluacions)
      return res
        .status(404)
        .send({ message: `No s'ha trobat cap avaluacio de l'establiment` });
    return res.status(200).send({ avaluacions });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

export async function createAvaluacio(req, res) {
  let userId = res.locals.payload.sub;
  let establimentId = req.params.establimentId;
  try {
    let avaluacio = new Avaluacio({
      ...req.body,
      userId,
      establimentId,
    });
    await avaluacio.save();
    return res.status(200).send({ avaluacioSaved: avaluacio });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

export async function updateAvaluacio(req, res) {
  let userId = res.locals.payload.sub;
  let establimentId = req.params.establimentId;
  try {
    let avaluacio = await Avaluacio.findOne({ userId, establimentId });
    if (!avaluacio)
      return res.status(404).send({ message: `L'avaluació no existeix` });
    avaluacio.nota = req.body.nota;
    avaluacio.comentari = req.body.comentari;
    const avaluacioUpdated = await avaluacio.save();
    return res.status(200).send(avaluacioUpdated);
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

export async function deleteAvaluacio(req, res) {
  let userId = res.locals.payload.sub;
  let establimentId = req.params.establimentId;
  try {
    let avaluacioDeleted = await Avaluacio.findOneAndDelete({
      userId,
      establimentId,
    });
    if (!avaluacioDeleted)
      return res.status(404).send({ message: "L'avaluació no existeix" });
    return res.status(200).send({ avaluacioDeleted });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${err}` });
  }
}
