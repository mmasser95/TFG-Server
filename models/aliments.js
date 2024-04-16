const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let alimentsSchema = Schema({
  nom: String,
  tipus: String,
  temps_defecte_conservacio: Number,
  t_unitat: String,
});

module.exports = mongoose.model('Aliments', alimentsSchema);
