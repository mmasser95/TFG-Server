const Users = require('../models/user');
const bcrypt = require('bcrypt-node');
const Token = require('./token');
const mongoose=require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const { parse } = require('date-fns');

const parseDate = (dateStr) => parse(dateStr, 'DD/LL/yyyy');

const esquemaUser = [
  'nom',
  'cognoms',
  'correu',
  'contrasenya',
  'telf',
  'data_naixement',
];

async function getAllUsers() {
  return await Users.find({});
}

async function getUser(id) {
  let user = await Users.findOne({ _id: id });
  if (!user) throw '404';
  return user;
}

async function loginUser(correu, contrasenya) {
  let query = Users.findOne({ correu });
  query.select('correu nom contrasenya _id');
  let user = await query.exec();
  if (!user) throw '404';
  if (bcrypt.compareSync(contrasenya, user.contrasenya))
    return {
      token: Token.createToken(user),
      userId: user._id,
      userType: 'client',
    };
  throw '401';
}

async function signInUser(userInfo) {
  let myInfo = {};
  for (const key of esquemaUser) {
    myInfo[key] = userInfo[key];
  }
  let user = new Users({ ...myInfo });
  return await user.save();
}

async function updateUser(id, userInfo) {
  let user = await getUser(id);
  for (const key in userInfo) {
    if (Object.hasOwnProperty.call(userInfo, key)) {
      if (userInfo[key] == '') continue;
      if (key == 'data_naixement') {
        user[key] = parseDate(userInfo[key]);
        continue;
      }
      user[key] = userInfo[key];
    }
  }
  return user.save();
}

async function deleteUser(id) {
  let user = await Users.findOneAndDelete({ _id: id });
  if (!user) throw '404';
  return user;
}

async function getPreferits(userId) {
  let user = await Users.findOne({ _id: userId }).select(
    'establiments_fav'
  );
  if (!user || !user.establiments_fav) throw '404';
  return user.establiments_fav;
}

async function getMyPreferits(userId) {
  let user = await Users.findOne({ _id: userId })
    .populate('establiments_fav').select('establiments_fav')
  if (!user) throw '404';
  return user;
}

async function marcarPreferit(userId, establimentId) {
  let preferit = await Users.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { establiments_fav: new ObjectId(establimentId)  } }
  );
  if (!preferit) throw '404';
  return preferit;
}

async function desmarcarPreferit(userId, establimentId) {
  let preferit = await Users.findOneAndUpdate(
    { _id: userId },
    { $pull: { establiments_fav: new ObjectId(establimentId)  } }
  );
  if (!preferit) throw '404';
  return preferit;
}

async function actualitzarContrasenya(
  userId,
  contrasenyaAntiga,
  contrasenyaNova
) {
  let query = Users.findOne({ _id: userId });
  query.select('contrasenya _id');
  let user = await query.exec();
  if (!user) throw '404';
  if (!bcrypt.compareSync(contrasenyaAntiga, user.contrasenya)) throw '401';
  let userUpdated = await Users.findOneAndUpdate(
    { _id: userId },
    { contrasenya: contrasenyaNova }
  );
  return userUpdated;
}

module.exports = {
  getAllUsers,
  getUser,
  loginUser,
  signInUser,
  updateUser,
  deleteUser,
  getPreferits,
  getMyPreferits,
  marcarPreferit,
  desmarcarPreferit,
  actualitzarContrasenya,
};
