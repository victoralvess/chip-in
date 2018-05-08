const passport = require('passport');
const {Strategy} = require('passport-local');

const user = {
  id: 'Uid19835760798',
  username: 'admin',
  wallet: 500.00
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    (username, password, done) => {
      if (username === user.username) {
        if (password === 'admin') {
          done(null, user);
        } else {
          done(null, false, { message: 'Incorrect password.' });
        }
      } else {
        done(null, false, { message: 'Incorrect username.' });
      }
    }
  )
);
