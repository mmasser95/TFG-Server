const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const user = require('./user');
const Schema = mongoose.Schema;

let direccioSchema = Schema({
  carrer: String,
  numero: Number,
  CP: Number,
  poblacio: String,
  provincia: String,
  pais: String,
  data_creacio: { type: Date, default: Date.now },
  data_modificacio: { type: Date, default: Date.now },
});

let ofertesSchema = Schema({
  nom: String,
  preu: Number,
  descripcio: String,
  quantitat_disponible: Number,
  active: Boolean,
  url_image: String,
  categoria: String,
  data_inici: { type: Date, default: Date.now },
  data_final: { type: Date, default: Date.now },
});

let establimentsSchema = Schema({
  nom: String,
  correu: { type: String, unique: true, lowercase: true },
  contrasenya: { type: String, select: false },
  descripcio: String,
  tipus: String,
  horari: String,
  telf: { type: String },
  web: String,
  data_creacio: { type: Date, default: Date.now },
  data_modificacio: { type: Date, default: Date.now },
  direccio: direccioSchema,
  ofertes: [ofertesSchema],
  url_imatge_perfil: String,
});

establimentsSchema.pre('save', function (next) {
  let establiment = this;
  establiment.data_creacio = new Date();
  establiment.data_modificacio = new Date();
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
  establiment.data_modificacio = new Date();
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
