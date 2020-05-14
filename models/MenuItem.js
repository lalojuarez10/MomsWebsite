const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create our Schema
const MenuItemSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  foodType: {
    type: String,
    required: true
  },
  date: {
    type: Date, 
    default: Date.now
  }
});

module.exports = MenuItem = mongoose.model('MenuItem', MenuItemSchema);