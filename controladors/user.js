const bcrypt=require('bcrypt-node');
const Token=require('../serveis/token.js');
const User=require('../models/user');

async function postUser(req,res) {
	let post=req.body;
	let user=new User({
		email:post.email,
		username:post.username,
		nom:post.nom,
		cognoms:post.cognoms,
		data_naixement:post.data_naixement,
		pass:post.pass,
		telf:post.telf
	});
	try {
		await user.save();
		return res.status(200).send('Usuari registrat correctament!');
	} catch (err) {
		return res.status(500).send(`Ha sorgit l'error següent ${err}`);
	}
	user.save((err, usersaved)=>{
		if (err) return res.status(500).send({message:`Error ${err}`});
		return res.status(200).send({message:'Usuari creat', usersaved});
	});
}

async function getUsers(req,res) {
	try {
		const users = await User.find({});
		return res.status(200).send({users});
	} catch (error) {
		return res.status(500).send({error});
	}
	
}

async function logIn(req,res) {
	let post=req.body;
	let query=User.findOne({email:post.email});
	query.select('email nom pass _id');
	try {
		let user=await query.exec();
		if (!user) return res.status(404).send({message:`L'usuari no existeix`})
		bcrypt.compare(post.pass,user.pass,(err, result)=>{
			if (err) return res.status(500).send({message: `Hi ha hagut un error al moment de comparar les contrassenyes: ${err}`});
			if (!result) return res.status(401).send({message:'Contrassenya incorrecta'});
			return res.status(200).send({
				token: Token.createToken(user),
				user_id: user._id,
				message:'Login correcte!'
			});
		});
	} catch (err) {
		return res.status(500).send({message:`Error ${err}`});
		
	}
}

async function getMyUser(req,res) {
	let user_id=res.locals.payload.sub;
	try {
		let user= await User.findOne({_id:user_id});
		if (!user) return res.status(404).send({message:"No s'ha trobat l'usuari"});
		return res.status(200).send({user});
	} catch (err) {
		return res.status(500).send({message:`Error ${err}`});
	}

}

function verificarTokenUsuari(req,res) {
	let post=req.body;
	Token
		.decodeToken(post.token)
		.then((result)=>{
			return res.status(200).send({
				token:Token.createToken({_id:result.sub}),
				user_id:result.sub,
				message:'Token renovat'
			});
		})
		.catch((err) => {
			return res.status(err.status).send(err.message);
		});
}
module.exports={
	postUser,
	getUsers,
	logIn,
	getMyUser,
	verificarTokenUsuari,
}
