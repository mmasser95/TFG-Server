const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let establimentsSchema = Schema({
    nom: String,
    descripció: String,
    direccio: { type: Schema.Types.ObjectId, ref: 'Direcció' },
    latitude: Number,
    longitude: Number,
    responsable: { type: Schema.Types.ObjectId, ref: 'User' },
    telf: { type: String },
});

module.exports = mongoose.model('Establiments', establimentsSchema);