const mongoose=require('mongoose');
const bcrypt=require('bcrypt-node');
const Schema=mongoose.Schema;

let userSchema=Schema({
	email: { type: String, unique: true, lowercase: true },
	username: String,
	pass: { type: String, select: false },
	lastlogin: Date,
	telf: { type: String },
	nom: { type: String },
	cognoms: { type: String },
	data_naixement: { type: Date },
	direccio: [
	      {
	            carrer: String,
	            numero: Number,
	            porta: String,
	            escala: String,
	            pis: String,
	            CP: Number,
	            poblacio: String,
	            provincia:String,
	          },
	],
});

userSchema.pre('save', function(next) {
	  let user = this;
	  if (!user.isModified('pass')) return next();
	  bcrypt.genSalt(10, (err, salt) => {
		      if (err) return next();
		      bcrypt.hash(user.pass, salt, null, (err, hash) => {
			            if (err) return next(err);
			            user.pass = hash;
			            next();
			          });
		    });
});
userSchema.pre('update', function(next) {
	  let user = this;
	  if (!user.isModified('pass')) return next();
	  bcrypt.genSalt(10, (err, salt) => {
		      if (err) return next();
		      bcrypt.hash(user.pass, salt, null, (err, hash) => {
			            if (err) return next(err);
			            user.pass = hash;
			            next();
			          });
		    });
});

module.exports=mongoose.model('User', userSchema);
