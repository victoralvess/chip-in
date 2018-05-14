require('dotenv').config({ path: __dirname + '/.env'});
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
//const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const compression = require('compression');
const jwt = require('jsonwebtoken');

require('./config');
const Goal = require('./models/goal');
const User = require('./models/user');

const verifyToken = require('./utils/verifyToken');
const verifyUser = require('./utils/verifyUser');

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

const generateUserDataAndJwt = (user) => { 
  const userData = {
    id: user.id,
    username: user.username,
    wallet: user.wallet
  };

  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  return {
    user: userData,
    jwt: token
  };
};

app.post(
  '/authenticate',
  (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
      if (error) return next(error);
      if (!user) return res.status(401).send(info);
      req.login(user, (error) => {
        if (error) return next(error);

        res.json(generateUserDataAndJwt(user))
      });
    })(req, res, next);
  }
);

app.get('/v1/users/:uid/goals/', verifyToken, verifyUser, async (req, res) => {
  const { uid } = req.params;
  
  try {
    const goals = await Goal.find().where({ uid });
    
    if (!goals.length) throw "Not Found.";

    return res.status(200).json(goals);
  } catch (error) {
    return res.status(404).end();
  }

});

app.get('/v1/users/:uid/goals/:id', verifyToken, verifyUser, async (req, res) => {
  const { uid, id } = req.params;
  
  try {
    const goal = await Goal.findById(id).where({ uid });
    
    if (!goal) throw "Not Found."
  
    res.status(200).json(goal);    
  } catch (error) {
    res.status(404).end();
  }
});

app.post(
  '/v1/goals/add',
  verifyToken,
  async (req, res) => {
    let { title, description, goal, due } = req.body;
    let due_date = new Date(`${due}T23:59:59.999Z`);
    
    let errors = [];

    title = removeWhiteSpace(title);
    description = removeWhiteSpace(description);
    goal = parseInt(goal);

    if (!title.length) errors.push({ message: 'Please enter a valid title.' });
    if (!description.length) errors.push({ message: 'Please enter a valid description.'});
    if (goal < 1) errors.push({ message: 'Your goal have to be greater than or equal to $1.' });
    if (
      due.length !== 10 ||
      due.match(/\d{4}(-\d{2}){2}/)[0] !== due ||
      due_date.getTime() < Date.now() 
    ) errors.push({ message: 'Please enter a valid date' });

    if (errors.length) return res.status(400).json(errors);

    try {
      await Goal.create({
        title,
        description,
        goal,
        due: due_date,
        uid: req.user_jwt.id
      });

      return res.status(201).json({ ok: true });
    } catch (e) {
      res.status(400).json([{ message: 'Something went wrong.' }])
    }
  });

app.patch('/v1/users/:id', verifyToken, async (req, res) => {
  const patch = req.body[0];
  const id = req.params.id;
 
  let user = null;

  if (patch.op === 'update_wallet' && patch.field === 'wallet') {
    try {
      user = await User.findById(id);

      if (!user) throw "Not found.";
    } catch (error) {
      return res.status(404).send("User not found.");
    }
     
    try {
      user.wallet = user.wallet + parseFloat(patch.value);
      const u = await user.save();
      
      if (!u) throw "Error";

      res.status(200).json(generateUserDataAndJwt(user));
    } catch (error) {
      return res.status(404).send("Error on patch.");
    }
  };
});

app.patch('/v1/goals/:id', verifyToken, async (req, res) => {
  const patch = req.body[0];
  const id = req.params.id;
 
  let goal = null;

  if (patch.op === 'update' && patch.field === 'is_open' && patch.value === false) {
    try {
      goal = await Goal.findById(id);

      if (!goal) throw "Error";

      goal.is_open = patch.value;

      const g = await goal.save();

      res.status(200).json(goal);
    } catch (error) {
      res.status(400).end();
    }
  }
});

function removeWhiteSpace(str) {
  return str.replace(/\s{2,}/g, ' ').trim();
}

app.listen(8080, () => {
  console.log('Server running at: http://localhost:8080');
});
