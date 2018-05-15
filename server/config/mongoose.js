const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, {
  autoReconnect: true,
  connectTimeoutMS: 15000
});

module.exports = mongoose;
