const router      = require('express').Router();

const restaurants = require('../controllers/restaurants');
const register    = require('../controllers/authentications');
const login       = require('../controllers/authentications');

router.route('/restaurants')
  .get(restaurants.index);

router.route('/register')
  .get(register.index);

router.route('/login')
  .get(login.index);

module.exports = router;
