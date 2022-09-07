const passport = require('passport');
const local = require('./local'); //LocalStrategy
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  //id로 user 복구
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
