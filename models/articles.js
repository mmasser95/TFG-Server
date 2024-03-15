const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articlesSchema = Schema({
    nom: String,
    tipus: String,
    temps_defecte_conservació: String,
});

module.exports = mongoose.model('Articles', articlesSchema);