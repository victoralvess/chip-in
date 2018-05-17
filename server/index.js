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
const CREATED_EVENT = 'created';

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

const ensureLoggedIn = (req, res, next) => {
  const { user } = req;
  if (user) return next();
  return res.status(401).end();
};

const generateUserDataAndJwt = (user) => { 
  const userData = {
    id: user.id,
    username: user.username,
    wallet: user.wallet
  };

  const token = jwt.sign({
    ...userData,
    exp: new Date(Date.now() + 60 * 60 * 1000).getTime() / 1000
  }, process.env.JWT_SECRET, /*{
    expiresIn: '1h'
  }*/);
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

app.get('/v1/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    const g = goals.map(goal => goal.formatted);
    return res.status(200).json(g);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

app.get('/v1/users/:uid/goals/', ensureLoggedIn, verifyToken, verifyUser, async (req, res) => {
  const { uid } = req.params;
  
  try {
    const goals = await Goal.find().where({ uid });
    
    if (!goals.length) return res.status(200).json([]);

    const g = goals.map(goal => goal.formatted)
    
    return res.status(200).json(g);
  } catch (error) {
    return res.status(404).end();
  }

});

app.get('/v1/goals/:id', ensureLoggedIn, verifyToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    const goal = await Goal.findById(id);
    
    if (!goal) throw "Not Found."
  
    res.status(200).json(goal.formatted);
  } catch (error) {
    res.status(404).end();
  }
});

app.post(
  '/v1/goals/add',
  ensureLoggedIn,
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
      const created = await Goal.create({
        title,
        description,
        goal,
        due: due_date,
        uid: req.user_jwt.id
      });

      pusher.trigger(CHANNEL_NAME, CREATED_EVENT, {
        goal: created.formatted
      });

      return res.status(201).json({ ok: true });
    } catch (e) {
      res.status(400).json([{ message: 'Something went wrong.' }])
    }
  });

app.post('/v1/goals/:id/contribute', ensureLoggedIn, verifyToken, async (req, res) => {
  let goal = null;
  let user = null;

  const { id } = req.params;
  const { uid, value } = req.body;

  if (isNaN(value) || value < 0) return res.status(400).json({ message: 'Contribution value is invalid.' });

  try {
    user = await User.findById(uid);
  } catch (error) {
    return res.status(404).json({ message: 'User not found.' });
  }

  if (user.wallet < value) return res.status(400).json({ message: 'User has no enough money.' });

  try {
    goal = await Goal.findOneAndUpdate(
      { _id: id, is_open: true, due: { $gte: new Date() } },
      { $inc: { earned: value } },
      { new: true }
    );

    if (!goal) throw "Error";
  } catch (error) {
    return res.status(400).json({ message: 'Goal not found or achieved.' });
  }

  try {
    user.wallet -= value;
    await user.save();
  } catch (error) {
    goal.earned -= value;
    await goal.save();
    return res.status(400).json({ message: "Error on update user's wallet" });
  }

  pusher.trigger(CHANNEL_NAME, COLLABORATION_EVENT, {
    goal: goal.formatted,
    // ...generateUserDataAndJwt(user)
  });
 
  return res.json(generateUserDataAndJwt(user));
});

app.post('/v1/goals/:id/achieve', ensureLoggedIn, verifyToken, async (req, res) => {
  let goal = null;
  let user = null;
  let { user_jwt } = req;

  const { id } = req.params;

  try {
    user = await User.findById(user_jwt.id);
  } catch (error) {
    return res.status(404).json({ message: 'User not found.' });
  }

  try {
    goal = await Goal.findByIdAndUpdate(
      id,
      { is_open: false },
      { new: true }
    );

    if (!goal) throw "Error";

  } catch (e) {
    return res.status(404).json({ message: 'Goal not found.' })
  }
  
  if (user.id != goal.uid) {
    goal.is_open = true;
    await goal.save();
    return res.status(401).json({ message: `${user.username} doesn't have permission to close this goal` });
  }
  
  try {
    user.wallet += goal.earned;
    await user.save();
  } catch (e) {
    goal.is_open = true;
    await goal.save();
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
