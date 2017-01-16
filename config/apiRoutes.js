const router          = require('express').Router();
const restaurants     = require('../controllers/restaurants');
const authentications = require('../controllers/authentications');

router.route('/restaurants')
  .get(restaurants.index);

router.route('/register')
  .post(authentications.register);

router.route('/login')
  .post(authentications.login);

module.exports = router;
