const Token=require('../serveis/token');

function isAuth(req,res,next) {
	if (! req.headers.authorization) return res.status(401).send({message:'No tens autorització'});
	const token=req.headers.authorization.split(' ')[1];
	Token
		.decodeToken(token)
		.then((response)=>{
			res.locals.payload=response;
			return next();
		})
		.catch((response)=>{
			return res.status(response.status).send({message:response.message});
		});
}

module.exports={isAuth};
