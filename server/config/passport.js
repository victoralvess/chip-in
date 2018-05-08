const passport = require('passport');
const {Strategy} = require('passport-local');

const User = require('../models/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    if (error) return done(error);

    delete user.password;

    done(null, user);
  });
});

passport.use(
  new Strategy(
    (username, password, done) => {
      User.findOne({ username }, (error, user) => {
        if (error) return done(error);
        if (!user) return done(null, false, { message: 'Incorrect username.'});
        if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });
        
        const { id, username, wallet } = user;
        done(null, { id, username, wallet });
      });
    }
  )
);
