const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
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

module.exports = mongoose.model('User', userSchema);
