module.exports = {
  index: restaurantsIndex
};

const Restaurant = require('../models/restaurant');

function restaurantsIndex(req, res) {
  Restaurant.find((err, restaurants) => {
    if (err) return res.status(500).send();
    return res.status(200).json(restaurants);
  });
}
