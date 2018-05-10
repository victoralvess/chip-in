const mongoose = require('mongoose');
const {Schema} = mongoose;

const schema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 80
  },
  description: {
    type: String,
    required: true,
    maxlength: 140
  },
  earned: {
    type: Number,
    default: 0
  },
  goal: {
    type: Number,
    required: true
  },
  uid: {
    type: Schema.Types.ObjectId,
    required: true
  },
  due: {
    type: Date,
    required: true
  },
  is_open: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('goal', schema);
