const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const avaluacioSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  establimentId: {
    type: Schema.Types.ObjectId,
    ref: 'Establiment',
    required: true,
  },
  nota: Number,
  comentari: String,
  data_creacio: { type: Date, default: Date.now },
  data_modificacio: { type: Date, default: Date.now },
});

avaluacioSchema.pre('save', (next) => {
  let avaluacio = this;
  avaluacio.data_creacio = new Date();
  avaluacio.data_modificacio = new Date();
  next();
});

avaluacioSchema.pre('update', () => {
  let avaluacio = this;
  avaluacio.data_modificacio = new Date();
  next();
});

module.exports = mongoose.model('Avaluacio', avaluacioSchema);
