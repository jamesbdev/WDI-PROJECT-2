const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  lat: { type: String },
  lng: { type: String }
});

module.exports = mongoose.model('Restaurants', restaurantSchema);
