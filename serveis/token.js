const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

function createToken(user,establiment=false) {
	const payload={
		sub:user._id,
		iat:moment().unix(),
		tipus:'client',
		exp: moment().add(5,'days').unix()
	};
	if (establiment){
		payload.tipus='establiment'
	}	
	return jwt.encode(payload,config.SECRET_TOKEN);
}

function decodeToken(token) {
	const decoded=new Promise((resolve,reject)=>{
		try {
			const payload=jwt.decode(token,config.SECRET_TOKEN);
			if (payload.exp<=moment().unix()) resolve({
				status:401,
				message:'El token ha expirat'
			});
			resolve(payload);
		} catch (err) {
			reject({
				status:500,
				message:'Token invalid'
			});
		}
	});
	return decoded;
}


module.exports={
	createToken,
	decodeToken
}
