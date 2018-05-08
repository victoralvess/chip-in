const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');

require('./config');

const app = express();
app.use(express.static('dist'));
app.use(session({
  secret: 'ilikedogs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000
  }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get('/hello', (req, res) => {
  res.send('It\'s working');
});

app.post(
  '/authenticate',
  passport.authenticate('local'),
  (req, res) => {
    res.json(req.user);
  });

app.listen(8080, () => {
  console.log('Server running at: http://localhost:8080');
});
