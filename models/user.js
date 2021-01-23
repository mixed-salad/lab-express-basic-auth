// User model goes here
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1
  },
  hashedPassword: {
    type: String
  }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
