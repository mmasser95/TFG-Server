const Aliments = require('../models/aliments');

esquemaAliment = ['nom', 'tipus', 'temps_defecte_conservacio', 't_unitat'];

async function getAllAliments() {
  let aliments = Aliments.find({});
  if (!aliments) throw '404';
  return aliments;
}

async function getAliment(id) {
  let aliment = await Aliments.find({ _id: id });
  if (!aliment) throw '404';
  return aliment;
}

async function getAlimentByTipus(tipus) {
  let aliments = await Aliments.find({ tipus });
  if (!aliments) throw '404';
  return aliments;
}

async function getAlimentsByNoms(noms) {
  let aliments = await Aliments.find({
    nom: { $in: noms },
  });
  if (!aliments) throw '404';
  return aliments;
}

async function getTipus() {
  return ['Fruita', 'Verdura', 'Carn', 'Peix', 'Làctics'];
}

async function createAliment(alimentInfo) {
  let myAliment = {};
  for (const key of esquemaAliment) {
    if (Object.hasOwnProperty.call(alimentInfo, key)) {
      myAliment[key] = alimentInfo[key];
    }
  }
  let aliment = new Aliments({ ...myAliment });
  return await aliment.save();
}

async function updateAliment(id, alimentInfo) {
  let myAliment = {};
  for (const key of esquemaAliment) {
    if (Object.hasOwnProperty.call(alimentInfo, key)) {
      myAliment[key] = alimentInfo[key];
    }
  }
  let updated = await Aliments.findOneAndUpdate({ _id: id }, { ...myAliment });
  if (!updated) throw '404';
  return updated;
}
async function deleteAliment(id) {
  let deleted = await Aliments.findOneAndDelete({ _id: id });
  if (!deleted) throw '404';
  return deleted;
}

module.exports = {
  getAllAliments,
  getAliment,
  getAlimentByTipus,
  getAlimentsByNoms,
  getTipus,
  createAliment,
  updateAliment,
  deleteAliment,
};
