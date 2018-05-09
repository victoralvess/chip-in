require('dotenv').config({ path: __dirname + '/.env'});
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');

require('./config');

const app = express();
app.use(express.static('dist'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    sameSite: true
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/hello', (req, res) => {
  res.send(req.user);
});

app.post(
  '/authenticate',
  (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(401).send(info);
      req.login(user, (error) => {
        if (error) return next(error);

        const userData = {
          id: user.id,
          username: user.username,
          wallet: user.wallet
        };
        
        const token = jwt.sign({
          ...userData,
          expiresIn: '1h'
        }, process.env.JWT_SECRET);

        res.json({
          user: userData,
          jwt: token
        });
      });
    })(req, res, next);
  }
);

app.listen(8080, () => {
  console.log('Server running at: http://localhost:8080');
});
