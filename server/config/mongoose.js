const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO, {
  autoReconnect: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  reconnectTries: Number.MAX_VALUE
});

module.exports = mongoose;
