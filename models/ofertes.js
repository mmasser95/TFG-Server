const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ofertesSchema = Schema({
    establiment: { type: Schema.Types.ObjectId, ref: 'Establiments' },
    nom:String,
    preu: Number,
    descripcio: String,
    quantitat_disponible: Number,
    active:Boolean,
    url_image: String,
    categoria:String,
    data_inici:{ type:Date, default: Date.now},
    data_final:{ type:Date, default: Date.now}
});


module.exports = mongoose.model('Ofertes', ofertesSchema);