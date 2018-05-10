const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 14
  },
  password: {
    type: String,
    required: true
  },
  wallet: {
    type: Number,
    default: 300.00
  }
});

module.exports = mongoose.model('user', schema);
