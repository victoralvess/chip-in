const bcrypt = require('bcrypt');

module.exports.hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};
