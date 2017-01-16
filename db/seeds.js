const mongoose = require('mongoose');
const config   = require('../config/config');

mongoose.connect(config.db);

const Restaurant = require('../models/restaurant');
const User       = require('../models/user');

User.collection.drop();
Restaurant.collection.drop();

const user = [
  {
    username: 'James',
    email: 'j.bremner@ymail.com',
    password: 'dexter',
    passwordConfirmation: 'dexter'
  }
];

user.forEach(user => {
  User.create(user, (err, user) => {
    if (err) return console.log(err);
    return console.log(`${user.username} was saved.`);
  });
});

const restaurants = [
  {
    name: 'Arang',
    image: 'https://www.google.co.uk/maps/place/Arang+Restaurant/@51.511647,-0.136706,3a,75y,90t/data=!3m8!1e2!3m6!1s-QqV_ICKTduM%2FWCKOyPfQj1I%2FAAAAAAAAAP8%2F87TYrroTHiwPwisQ9V9tkprt2nUg6nS6gCLIB!2e4!3e12!6s%2F%2Flh4.googleusercontent.com%2F-QqV_ICKTduM%2FWCKOyPfQj1I%2FAAAAAAAAAP8%2F87TYrroTHiwPwisQ9V9tkprt2nUg6nS6gCLIB%2Fs152-k-no%2F!7i720!8i1280!4m5!3m4!1s0x487604d4679897a3:0x47e060528bb3f7ee!8m2!3d51.511713!4d-0.136568!6m1!1e1',
    lat: '51.511722',
    lng: '-0.136573'
  }
];

restaurants.forEach(restaurant => {
  Restaurant.create(restaurant, (err, restaurant) => {
    if(err) return console.log(err);
    return console.log(`${restaurant.name} was saved.`);
  });
});
