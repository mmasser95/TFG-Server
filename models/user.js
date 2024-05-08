const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');
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
  establiments_fav: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Establiments',
    },
  ],
  rebosts: [rebostsSchema],
  deviceTokens: [String],
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
