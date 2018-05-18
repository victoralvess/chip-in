const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 4,
    maxlength: 14
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  wallet: {
    type: Number,
    default: 300.00
  }
});

module.exports = mongoose.model('user', schema);
