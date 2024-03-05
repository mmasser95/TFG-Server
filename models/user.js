const mongoose=require('mongoose');
const bcrypt=require('bcrypt-node');
const Schema=mongoose.Schema;

let userSchema=Schema({
	email: { type: String, unique: true, lowercase: true },
	pass: { type: String, select: false },
	registrat: {type: Date, default: Date.now },
	lastlogin: Date,
	telf: String,
	nom: String ,
	cognoms: String,
	data_naixement: Date ,
	direccions: [{type: Schema.Types.ObjectId, ref: 'Direccio' }],
	establiments_fav:[{type: Schema.Types.ObjectId, ref: 'Establiments' }]
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
