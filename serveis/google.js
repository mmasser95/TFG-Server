const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const GoogleStrategy = require('passport-google-oidc');

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: '/api/v1/oauth/google',
  },
  async (issuer, profile, cb) => {
    try {
      let user = await User.findOne({ proveidor: profile.id });
      if (!user) {
        user = new User({
          nom: profile.name.givenName,
          cognoms: profile.name.familyName,
          proveidor: profile.id,
          correu: profile.emails[0].value,
        });
        let userSaved = await user.save();
        return cb(null, userSaved);
      }
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  }
);
module.exports = { googleStrategy };
