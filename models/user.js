const mongoose=require('mongoose');
const bcrypt=require('bcrypt-node');
const Schema=mongoose.Schema;

let userSchema=Schema({
	nom: String ,
	cognoms: String,
	correu: { type: String, unique: true, lowercase: true },
	contrasenya: { type: String, select: false },
	telf: String,
	data_naixement: Date,
	estat_compte:Boolean,
	data_registre: {type: Date, default: Date.now },
	ultima_sessio: {type:Date, default:Date.now},
});

userSchema.pre('save', function(next) {
	  let user = this;
	  user.data_registre=new Date();
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
userSchema.pre('update', function(next) {
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

module.exports=mongoose.model('User', userSchema);
