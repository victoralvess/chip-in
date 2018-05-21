const passport = require('passport');
const {Strategy} = require('passport-local');

const User = require('../models/user');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); 

    if (!user) return done(null, 'User not found. Please Try Sign in Again.');


    done(null, {
      id: user.id,
      username: user.username,
      wallet: user.wallet
    });
  } catch (error) {
    done(error);
  }
});

passport.use(
  new Strategy(
    (username, password, done) => {
      User.findOne({ username }, (error, user) => {
        if (error) return done(error);
        if (!user) return done(null, false, { message: 'Incorrect username.'});
        if (user.password !== password) return done(null, false, { message: 'Incorrect password.' });

        done(null, user);
      });
    }
  )
);
