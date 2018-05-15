require('dotenv').config({ path: __dirname + '/.env'});
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const compression = require('compression');
const jwt = require('jsonwebtoken');
const Pusher = require('pusher');

const { mongoose, passport: unsed } = require('./config');
const Goal = require('./models/goal');
const User = require('./models/user');

const verifyToken = require('./utils/verifyToken');
const verifyUser = require('./utils/verifyUser');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  host: 'api.pusherapp.com',
  encrypted: true
});
const CHANNEL_NAME = 'chip-in';
const COLLABORATION_EVENT = 'collaboration';
const ACHIEVE_EVENT = 'achieve';

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
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/hello', (req, res) => {
  res.send('hello');
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

app.get('/v1/goals', verifyToken, async (req, res) => {
  try {
    const goals = await Goal.find();
    const g = goals.map(goal => goal.formatted);
    return res.status(200).json(g);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/v1/users/:uid/goals/', verifyToken, verifyUser, async (req, res) => {
  const { uid } = req.params;
  
  try {
    const goals = await Goal.find().where({ uid });
    
    if (!goals.length) throw "Not Found.";

    const g = goals.map(goal => goal.formatted)
    
    return res.status(200).json(g);
  } catch (error) {
    return res.status(404).end();
  }

});

app.get('/v1/users/:uid/goals/:id', verifyToken, verifyUser, async (req, res) => {
  const { uid, id } = req.params;
  
  try {
    const goal = await Goal.findById(id).where({ uid });
    
    if (!goal) throw "Not Found."
  
    res.status(200).json(goal.formatted);
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

app.post('/v1/goals/:id/contribute', verifyToken, async (req, res) => {
  let goal = null;
  let user = null;

  const { id } = req.params;
  const { uid, value } = req.body;
  
  try {
    goal = await Goal.findById(id);
    user = await User.findById(uid);
  } catch (e) {
    return res.status(404).json({ message: 'Goal or User not found.' });
  }
  
  if (goal.is_open && !isNaN(value)) {
    goal.earned += value
    user.wallet -= value;

    if (user.wallet >= 0) {
      try {
        await user.save();
        await goal.save();

        pusher.trigger(CHANNEL_NAME, COLLABORATION_EVENT, {
          goal: goal.formatted,
          ...generateUserDataAndJwt(user)
        });

        return res.end();
      } catch (e) {
        return res.status(400).end({ message: "Error on update user's wallet or goal's earned money." });
      }
    } else {
      return res.status(400).json({ message: `${user.username} doesn't have enough money.` })
    }
  }

  res.status(400).json({ message: 'Invalid request.' });
});

app.post('/v1/goals/:id/achieve', verifyToken, async (req, res) => {
  let goal = null;
  let user = null;
  let { user_jwt } = req;

  const { id } = req.params;

  try {
    goal = await Goal.findById(id)
  } catch (e) {
    return res.status(404).json({ message: 'Goal not found.' })
  }
  
  if (user_jwt.id != goal.uid) {
    return res.status(401).json({ message: `${user.username} doesn't have permission to close this goal` });
  }

  try {
    user = await User.findById(user_jwt.id)
  } catch (e) {
    return res.status(404).json({ message: 'User not found.' });
  }
  
  const wallet = user.wallet;
  try {
    goal.is_open = false;
    user.wallet += goal.earned;
    await goal.save();
    await user.save();
  } catch (e) {
    goal.is_open = true;
    user.wallet = wallet;
    await goal.save();
    await user.save();
    return res.status(500).json({ message: 'Something went wrong.' });
  }

  pusher.trigger(CHANNEL_NAME, ACHIEVE_EVENT, {
    goal: goal.formatted
  });

  res.end();
});

function removeWhiteSpace(str) {
  return str.replace(/\s{2,}/g, ' ').trim();
}

app.listen(4000, () => {
  console.log(`Server running at: http://localhost:4000`);
});
