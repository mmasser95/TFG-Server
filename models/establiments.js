const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
const user = require('./user');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-node');

<<<<<<< HEAD
const rebostsSchema = require('./rebosts');

let direccioSchema = Schema({
  carrer: String,
  numero: Number,
  porta: String,
=======
let direccioSchema = Schema({
  carrer: String,
  numero: Number,
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
  CP: Number,
  poblacio: String,
  provincia: String,
  pais: String,
<<<<<<< HEAD
  data_creacio: Date,
  data_modificacio: Date,
=======
  data_creacio: { type: Date, default: Date.now },
  data_modificacio: { type: Date, default: Date.now },
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
});

let ofertesSchema = Schema({
  nom: String,
  preu: Number,
  descripcio: String,
<<<<<<< HEAD
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
  descripció: String,
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
=======
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
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
});

establimentsSchema.pre('save', function (next) {
  let establiment = this;
<<<<<<< HEAD
=======
  establiment.data_creacio = new Date();
  establiment.data_modificacio = new Date();
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
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
<<<<<<< HEAD
establimentsSchema.pre('update', function (next) {
  let establiment = this;
=======

establimentsSchema.pre('update', function (next) {
  let establiment = this;
  establiment.data_modificacio = new Date();
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
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
