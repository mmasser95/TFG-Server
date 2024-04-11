const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
<<<<<<< HEAD
const rebostsSchema = require('./rebosts');
const Schema = mongoose.Schema;

let userSchema = Schema({
  nom: String,
  cognoms: String,
  correu: { type: String, unique: true, lowercase: true },
  contrasenya: { type: String, select: false },
  telf: String,
  estat_compte: Boolean,
  data_naixement: Date,
  data_registre: { type: Date, default: Date.now },
  ultima_sessio: Date,
  comandes_restants_descompte: Number,
  establiments_fav: [{ type: Schema.Types.ObjectId, ref: 'Establiments' }],
  rebosts: [rebostsSchema],
});

userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('contrasenya')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();
    bcrypt.hash(user.contrasenya, salt, null, (err, hash) => {
      if (err) return next(err);
      user.contrasenya = hash;
      next();
    });
  });
});
userSchema.pre('update', function (next) {
  let user = this;
  if (!user.isModified('contrasenya')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();
    bcrypt.hash(user.contrasenya, salt, null, (err, hash) => {
      if (err) return next(err);
      user.contrasenya = hash;
      next();
    });
  });
});

=======
const Schema = mongoose.Schema;

let elementsSchema = Schema({
  article: { type: Schema.Types.ObjectId, ref: 'Articles' },
  data_compra: Date,
  data_caducitat: Date,
});

let rebostsSchema = Schema({
  nom: String,
  descripcio: String,
  elements: [elementsSchema],
  data_creacio: { type: Date, default: Date.now },
  data_modificacio: { type: Date, default: Date.now },
});

let userSchema = Schema({
  nom: String,
  cognoms: String,
  correu: { type: String, unique: true, lowercase: true },
  contrasenya: { type: String, select: false },
  telf: String,
  data_naixement: Date,
  estat_compte: Boolean,
  data_registre: { type: Date, default: Date.now },
  ultima_sessio: { type: Date, default: Date.now },
  proveidor: String,
  rebosts: [rebostsSchema],
  preferits:{ type: Schema.Types.ObjectId, ref:'Establiments'}
});

userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('contrasenya')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();
    bcrypt.hash(user.contrasenya, salt, null, (err, hash) => {
      if (err) return next(err);
      user.contrasenya = hash;
      next();
    });
  });
});
userSchema.pre('update', function (next) {
  let user = this;
  if (!user.isModified('contrasenya')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next();
    bcrypt.hash(user.contrasenya, salt, null, (err, hash) => {
      if (err) return next(err);
      user.contrasenya = hash;
      next();
    });
  });
});

>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
module.exports = mongoose.model('User', userSchema);
