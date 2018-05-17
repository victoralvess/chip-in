const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const auth = req.headers.authorization.split(' ');
    const token = auth[1];

    if (auth[0] !== 'Bearer') return res.status(401).json([{ message: 'Token Error.' }]);

    jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
      if (error) return res.status(401).json([{ message: 'Token Error.' }]);
      req.user_jwt = decoded;
      next();
    });
  } catch (e) {
    return res.status(401).json([{ message: 'Token Error.' }]);
  }
};
