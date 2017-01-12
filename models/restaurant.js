const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {type: String, required: true},
  picture: {type: String, required: false},
  lat: String,
  lng: String
});

module.exports = mongoose.model('Restaurants', restaurantSchema);
