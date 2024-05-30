const Establiments = require('../models/establiments');
const Users = require('../models/user');

async function getAllRebosts(userId, userType) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId }).select('rebosts._id rebosts.nom rebosts.descripcio');
  if (!usuari) throw '404';
  return usuari.rebosts;
}

async function getRebost(userId, userType, rebostId) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId });
  if (!usuari) throw '404';
  let rebost = usuari.rebosts.id(rebostId);
  if (!rebost) throw '404';
  return rebost;
}

async function createRebost(userId, userType, rebostInfo) {
  let model = userType == 'client' ? Users : Establiments;
  let usuari = await model.findOne({ _id: userId });
  if (!usuari) throw '404';
  usuari.rebosts.push(rebostInfo);
  return await usuari.save();
}

async function updateRebost(userId, userType, rebostId, rebostInfo) {
  let model = userType == 'client' ? Users : Establiments;
  let updated = await model.findOneAndUpdate(
    { _id: userId, 'rebosts._id': rebostId },
    { 'rebosts.$.nom': rebostInfo.nom }
  );
  return updated;
}

async function deleteRebost(userId, userType, rebostId) {
  let model = userType == 'client' ? Users : Establiments;
  let deleted = await model.findOneAndUpdate(
    { _id: userId },
    { $pull: { rebosts: { _id: rebostId } } }
  );
  if (!deleted) throw '404';
  return deleted;
}

async function getAmbAlgunElementCaducat(model){
  try{
    let users=await model.aggregate([
      // Desenrollar el arreglo 'rebosts' para poder acceder a los elementos individuales
      { $unwind: "$rebosts" },
      // Filtrar los elementos caducados
      { $match: { "rebosts.elements.data_caducitat": { $lt: new Date() } } },
      // Proyectar solo el campo 'nombre' del usuario
      { $project: { _id: 1} }
    ])
    if(!users) return []
    return users.map(el=>el._id)
  }catch(err){
    console.log(err)
  }
  
}

async function getAllUsuarisAmbAlgunElementCaducat(){
  let clients=await getAmbAlgunElementCaducat(Users)
  let establiments=await getAmbAlgunElementCaducat(Establiments)
  return [clients,establiments]
}

module.exports = {
  getAllRebosts,
  getRebost,
  createRebost,
  updateRebost,
  deleteRebost,
  getAllUsuarisAmbAlgunElementCaducat
};
