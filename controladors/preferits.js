const Preferits = require('../models/preferits');
const Establiments = require('../models/establiments');

async function getAllPreferits(req, res) {
  const userId = res.locals.payload.sub;
  try {
    const establimentIds = await Preferits.find({ userId }).map(
      (item) => item.establimentId
    );
    if (!establimentIds)
      return res.status(404).send({ message: 'No existeixen preferits' });
    const establiments = await Establiments.find({
      _id: { $in: establimentIds },
    });
    if (!establiments)
      return res.status(404).send({ message: 'No existeixen preferits' });
    return res.status(200).send({ preferits: establiments });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${err}` });
  }
}

async function createPreferit(req, res) {
  const userId = res.locals.payload.sub;
  const establimentId = req.params.establimentId;
  try {
    const preferit = new Preferits({
      userId,
      establimentId,
    });
    await preferit.save();
    return res.status(201).send({ preferitSaved: preferit });
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit el següent error ${err}` });
  }
}

async function deletePreferit(req, res) {
  const userId = res.locals.payload.sub;
  const establimentId = req.params.establimentId;
  try {
    const preferitDeleted = await Preferits.findOneAndUpdate({
      userId,
      establimentId,
    });
    if (!preferitDeleted)
      return res.status(404).send({ message: 'No existeix el preferit' });
    return res.status(200).send(preferitDeleted);
  } catch (err) {
    return res
      .status(500)
      .send({ message: `Ha sorgit l'error següent ${err}` });
  }
}

module.exports = {
  getAllPreferits,
  createPreferit,
  deletePreferit,
};
