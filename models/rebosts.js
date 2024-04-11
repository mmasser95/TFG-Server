const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let elementsSchema = Schema({
  aliment: { type: Schema.Types.ObjectId, ref: 'Articles' },
  data_creacio: Date,
  data_modificacio: Date,
  data_compra: Date,
  data_caducitat: Date,
  quantitat: Number,
  q_unitat: String,
});

let rebostsSchema = Schema({
  nom: String,
  descripcio: String,
  data_creacio: Date,
  data_modificacio: Date,
  elements: [elementsSchema],
});

module.exports = rebostsSchema;
