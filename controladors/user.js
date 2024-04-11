<<<<<<< HEAD
const Token = require('../serveis/token.js');
const UserService = require('../serveis/users');

async function postUser(req, res) {
  try {
    user = UserService.signInUser(req.body);
    return res
      .status(200)
      .send({ userSaved: user, message: 'Usuari registrat correctament!' });
  } catch (err) {
    return res.status(500).send(`Ha sorgit l'error següent ${err}`);
  }
=======
const bcrypt=require('bcrypt-node');
const Token=require('../serveis/token.js');
const User=require('../models/user');
const parse = require('date-fns/parse')
async function postUser(req,res) {
	let post=req.body;
	try{
		var data=parse.parse(post.data_naixement, 'dd/MM/yyyy', new Date());
	}catch (err) {
		return res.status(500).send({message:`La data està escrita en format incorrecte${err}`});
	}
	let user=new User({
		correu:post.correu,
		username:post.username,
		nom:post.nom,
		cognoms:post.cognoms,
		data_naixement:post.data_naixement,
		contrasenya:post.contrasenya,
		telf:post.telf,
		proveidor:'local',
	});
	try {
		await user.save();
		return res.status(200).send('Usuari registrat correctament!');
	} catch (err) {
		return res.status(500).send(`Ha sorgit l'error següent ${err}`);
	}
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
}

async function getUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).send({ users });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

<<<<<<< HEAD
async function logIn(req, res, next) {
  let post = req.body;
  try {
    loginInfo = await UserService.loginUser(post.correu, post.contrasenya);
    return res.status(200).send({
      ...loginInfo,
      message: 'Login correcte!',
    });
  } catch (err) {
    if (err == '404') return next();
    if (err == '401')
      return res.status(401).send({ message: 'Login incorrecte' });
    return res.status(500).send({ message: `Error ${err}` });
  }
=======
async function logIn(req,res) {
	let post=req.body;
	let query=User.findOne({correu:post.correu});
	query.select('correu nom contrasenya _id');
	try {
		let user=await query.exec();
		if (!user) return res.status(401).send({message:`Usuari o contrasenya incorrecta`})
		bcrypt.compare(post.contrasenya,user.contrasenya,(err, result)=>{
			if (err) return res.status(500).send({message: `Hi ha hagut un error al moment de comparar les contrassenyes: ${err}`});
			if (!result) return res.status(401).send({message:'Usuari o contrasenya incorrecta'});
			return res.status(200).send({
				token: Token.createUserToken(user),
				user_id: user._id,
				message:'Login correcte!'
			});
		});
	} catch (err) {
		return res.status(500).send({message:`Error ${err}`});
		
	}
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
}

async function getMyUser(req, res) {
  let user_id = res.locals.payload.sub;
  try {
    let user = await UserService.getUser(user_id);
    return res.status(200).send({ user });
  } catch (err) {
    if (err == '404')
      return res.status(404).send({ message: "No s'ha trobat l'usuari" });
    return res.status(500).send({ message: `Error ${err}` });
  }
}

<<<<<<< HEAD
function verificarTokenUsuari(req, res) {
  let post = req.body;
  Token.decodeToken(post.token)
    .then((result) => {
      return res.status(200).send({
        token: Token.createToken({ _id: result.sub }),
        user_id: result.sub,
        message: 'Token renovat',
      });
    })
    .catch((err) => {
      return res.status(err.status).send(err.message);
    });
=======
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

async function loginGoogle(req, res) {

}
module.exports={
	postUser,
	getUsers,
	logIn,
	getMyUser,
	verificarTokenUsuari,
>>>>>>> d4d839f3a3086caaf00dc03915903307889af1c7
}
module.exports = {
  postUser,
  getUsers,
  logIn,
  getMyUser,
  verificarTokenUsuari,
};
