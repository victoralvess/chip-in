module.exports = (req, res, next) => {
  const { uid } = req.params;
  const user = req.user;
  if (!user) return res.status(401).end();

  if ((uid !== user.id) || (uid !== req.user_jwt.id)) return res.status(403).end();
 
  next();
};
