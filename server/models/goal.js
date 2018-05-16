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

class Goal {
  get id () {
    return this._id;
  }

  get progress () {
    return this.earned * 100 / this.goal;
  }

  get formatted () {
    return {
      ...this._doc,
      id: this.id,
      progress: this.progress,
      expired: new Date(this.due).getTime() < new Date().getTime()
    };
  }
}

schema.loadClass(Goal);

module.exports = mongoose.model('goal', schema);
