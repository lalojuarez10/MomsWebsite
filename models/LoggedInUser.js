const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LoggedInUserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = LoggedInUser = mongoose.model('loggedInUser', LoggedInUserSchema);