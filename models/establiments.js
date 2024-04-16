const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const user = require('./user');
const Schema = mongoose.Schema;

const rebostsSchema = require('./rebosts');

let direccioSchema = Schema({
  carrer: String,
  numero: Number,
  CP: Number,
  poblacio: String,
  provincia: String,
  pais: String,
  data_creacio: Date,
  data_modificacio: Date,
});

let ofertesSchema = Schema({
  nom: String,
  preu: Number,
  descripcio: String,
  quantitatDisponible: Number,
  active: Boolean,
  url_imatge: String,
  categoria: String,
  data_creacio: { type: Date, default: Date.now(), select: false },
  data_modificacio: { type: Date, select: false },
  data_començament: Date,
  data_finalitzacio: Date,
});

let avaluacionsSchema = Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  comentari: String,
  quantitat: Number,
  qualitat: Number,
  data_creacio: { type: Date, default: Date.now(), select: false },
  data_modificacio: { type: Date, select: false },
});

let establimentsSchema = Schema({
  nom: { type: String, unique: true },
  correu: { type: String, unique: true, lowercase: true },
  contrasenya: { type: String, select: false },
  descripcio: String,
  tipus: String,
  telf: String,
  web: String,
  data_creacio: { type: Date, select: false, default: Date.now() },
  data_modificacio: { type: Date, select: false },
  url_imatge: String,
  packs_salvats: { type: Number, default: 0 },
  direccio: direccioSchema,
  rebosts: [rebostsSchema],
  ofertes: [ofertesSchema],
  avaluacions: [avaluacionsSchema],
  coordenades:[Number]
});

establimentsSchema.index({
  'coordenades':'2dsphere'
})

establimentsSchema.pre('save', function (next) {
  let establiment = this;
  if (!establiment.isModified('contrasenya')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();
    bcrypt.hash(establiment.contrasenya, salt, null, (err, hash) => {
      if (err) return next(err);
      establiment.contrasenya = hash;
      next();
    });
  });
});
establimentsSchema.pre('update', function (next) {
  let establiment = this;
  if (!establiment.isModified('contrasenya')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();
    bcrypt.hash(establiment.contrasenya, salt, null, (err, hash) => {
      if (err) return next(err);
      establiment.contrasenya = hash;
      next();
    });
  });
});

module.exports = mongoose.model('Establiments', establimentsSchema);
