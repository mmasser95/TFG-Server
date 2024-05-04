const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let avaluacionsSchema = Schema({
  comentari: String,
  quantitat: Number,
  qualitat: Number,
  data_creacio: { type: Date, default: Date.now(), select: false },
  data_modificacio: { type: Date, select: false },
});

let comandesSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  establimentId: { type: Schema.Types.ObjectId, ref: 'Establiments' },
  ofertaId: { type: Schema.Types.ObjectId, ref: 'Establiments.ofertes' },
  quantitat: Number,
  total: Number,
  data: { type: Date, default: Date.now },
  avaluacio: avaluacionsSchema,
});

module.exports = mongoose.model('Comandes', comandesSchema);
