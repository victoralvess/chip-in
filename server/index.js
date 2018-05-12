require('dotenv').config({ path: __dirname + '/.env'});
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
//const mongoose = require('mongoose');
const compression = require('compression');
const jwt = require('jsonwebtoken');

require('./config');
const Goal = require('./models/goal');

const verifyToken = require('./utils/verifyToken');

const app = express();
app.use(compression());
app.use(express.static('dist'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 3600000,
    sameSite: true
  },
  //store: new MongoStore({ mongooseConnection: mongoose.connection })
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
        
        const token = jwt.sign(userData, process.env.JWT_SECRET, {
          expiresIn: '1h'
        });

        res.json({
          user: userData,
          jwt: token
        });
      });
    })(req, res, next);
  }
);

app.get('/v1/users/:id/goals/', verifyToken, (req, res) => {
  const uid = req.params.id;
  const user = req.user;
  if (!user) return res.status(401).end();

  if ((uid !== user.id) || (uid !== req.user_jwt.id)) return res.status(403).end();
  Goal.find().where({ uid }).exec((error, goals) => {
    if (error) return res.status(404).end();
    res.status(200).json(goals);
  });
});

app.post(
  '/v1/goals/add',
  verifyToken,
  (req, res) => {
    let { title, description, goal, due } = req.body;
    let due_date = new Date(`${due}T23:59:59.999Z`);
    let errors = [];
    title = removeWhiteSpace(title)
    description = removeWhiteSpace(description);
    goal = parseInt(goal);

    if (title.length < 1) errors.push({ message: 'Please enter a valid title.' });
    if (description.length < 1) errors.push({ message: 'Please enter a valid description.'});
    if (goal < 1) errors.push({ message: 'Your goal have to be greater than or equal to $1.' });
    if (
      due.length !== 10 ||
      due.match(/\d{4}(-\d{2}){2}/)[0] !== due ||
      due_date.getTime() < Date.now() 
    ) errors.push({ message: 'Please enter a valid date' });

    if (errors.length > 0) return res.status(400).json(errors);
    
    Goal.create({
      title,
      description,
      goal,
      due: due_date,
      uid: req.user_jwt.id
    })
      .then(_ => res.status(201).json({ ok: true }))
      .catch(e => {
        console.log(e)
        res.status(400).json([{ message: 'Something went wrong.' }])
      });
  }
);

function removeWhiteSpace(str) {
  return str.replace(/\s{2,}/g, ' ').trim();
}

app.listen(8080, () => {
  console.log('Server running at: http://localhost:8080');
});
