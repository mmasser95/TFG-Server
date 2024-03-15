const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ofertesSchema = Schema({
    establiment: { type: Schema.Types.ObjectId, ref: 'Establiments' },
    descripcio: String,
    preu: Number,
    divisa: String,
});

module.exports = mongoose.model('Ofertes', ofertesSchema);