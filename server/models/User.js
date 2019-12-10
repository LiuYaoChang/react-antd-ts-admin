const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: String,
  gender: {
    type: String,
    default: '男'
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema);