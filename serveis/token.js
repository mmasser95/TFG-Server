const getUnix = require('date-fns/getUnixTime');
const addDaysL=require('date-fns/addDays')
const jwt = require('jwt-simple');
const config = require('../config');
const getUnixTime=getUnix.getUnixTime;
const addDays=addDaysL.addDays
function createUserToken(user) {
  const payload = {
    sub: user._id,
    iat: getUnixTime( new Date()),
    tipus: 'user',
    exp: getUnixTime( addDays(new Date(), 5)),
  };
  return jwt.encode(payload, config.SECRET_TOKEN);
}

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
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, config.SECRET_TOKEN);
      if (payload.exp <= getUnixTime(new Date()))
        resolve({
          status: 401,
          message: 'El token ha expirat',
        });
      resolve(payload);
    } catch (err) {
      reject({
        status: 500,
        message: 'Token invalid',
      });
    }
  });
  return decoded;
}

module.exports = {
  createToken,
  decodeToken,
};
