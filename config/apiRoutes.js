const router      = require('express').Router();

const restaurants = require('../controllers/restaurants');
const authentication = require('../controllers/authentications');

router.route('/restaurants')
  .get(restaurants.index);

router.route('/register')
  .post(authentication.register);

router.route('/login')
  .post(authentication.login);

module.exports = router;
