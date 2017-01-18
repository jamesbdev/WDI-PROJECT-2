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
    image: 'https://munchmyway.files.wordpress.com/2013/09/20130906-004148.jpg',
    lat: '51.511722',
    lng: '-0.136573'
  },
  {
    name: 'On The Bab Covent Garden',
    image: 'http://2.bp.blogspot.com/-rngOBezrZug/VgljBAwSzjI/AAAAAAAAMds/6xiTFAbC38g/s1600/On%2BThe%2BBab%253A%2BRestaurant%2BReview.JPG',
    lat: '51.512461',
    lng: ' -0.120751'
  },

  {
    name: 'Kimchee Restaurant and Bar',
    image: 'https://koreanclassmassive.files.wordpress.com/2014/01/p1110048.jpg',
    lat: '51.518158',
    lng: ' -0.116402'
  },

  {
    name: 'Hozi',
    image: 'https://pbs.twimg.com/media/Cpl4qboWAAE0fON.jpg',
    lat: '51.520234',
    lng: '-0.117687'
  },


  {
    name: 'Naru',
    image: 'https://pbs.twimg.com/media/Cpl4qboWAAE0fON.jpg',
    lat: '51.518158',
    lng: '-0.125894'
  },

  {
    name: 'Asadal',
    image: 'http://www.lacartes.com/images/business/932/2802/m/8715.jpg',
    lat: '51.517487',
    lng: '-0.120126'
  },

  {
    name: 'Bibigo',
    image: 'http://bibigouk.com/wp-content/uploads/2015/10/4632_122451_large.jpg',
    lat: '51.514695',
    lng: '-0.137329'
  },

  {
    name: 'Arirang',
    image: 'https://munchmyway.files.wordpress.com/2013/07/20130721-190237.jpg',
    lat: '51.515536',
    lng: '-0.137490'
  },

  {
    name: 'Bibimpap Soho',
    image: 'https://www.fluidnetwork.co.uk/gfx/venues/22472/bimbimbap_soho_korean_restaurant_london_3.jpg',
    lat: '51.514399',
    lng: '-0.130934'
  },

  {
    name: 'Kalbi Korean BBQ and Sushi',
    image: 'https://d6zktcp1soofu.cloudfront.net/kalbi-korean-bbq-sushi-13864/landscape.vlZDj_landscape.jpg',
    lat: '51.524197',
    lng: '-0.111090'
  },

  {
    name: 'K Place',
    image: 'https://i1.wp.com/londonkoreanlinks.net/wp-content/uploads/2015/05/IMG_4001.jpg',
    lat: '51.510463',
    lng: '-0.083454'
  },

  {
    name: 'On The Bap - Old Street',
    image: 'http://www.justopenedlondon.com/wp-content/uploads/2013/12/onthebabpic.jpg',
    lat: '51.526904',
    lng: '-0.081582'
  }
];




restaurants.forEach(restaurant => {
  Restaurant.create(restaurant, (err, restaurant) => {
    if(err) return console.log(err);
    return console.log(`${restaurant.name} was saved.`);
  });
});
