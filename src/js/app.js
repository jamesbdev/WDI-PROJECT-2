const App    = App || {};
const google = google;

App.mapSetup = function() {
  App.$main.html('<div id="map-container"></div>');
  const canvas = document.getElementById('map-container');

  const mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styledMapType
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getRestaurants();
};

App.getRestaurants = function() {
  $.get('http://localhost:3000/api/restaurants').done(this.loopThroughRestaurants);
};

App.loopThroughRestaurants = function(data) {
  $.each(data, (index, restaurant) => {
    App.addMarkerForRestaurant(restaurant);
  });
};

const markerImage = '../images/marker1.png';


App.addMarkerForRestaurant = function(restaurant) {
  const latlng = new google.maps.LatLng(restaurant.lat, restaurant.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: markerImage,
    animation: google.maps.Animation.DROP
  });
  App.markersArray.push(marker);
  this.addInfoWindowForRestaurant(restaurant ,marker);
};

const styledMapType =
[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.neighborhood","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"simplified"},{"saturation":"-28"},{"lightness":"-7"},{"gamma":"1.90"},{"weight":"1.98"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"lightness":"-13"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"labels.text","stylers":[{"hue":"#ff0000"},{"visibility":"off"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"weight":"4.93"}]},{"featureType":"poi","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"},{"hue":"#ff0000"},{"saturation":"-41"},{"gamma":"2.64"},{"weight":"1.42"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"visibility":"simplified"},{"saturation":"-20"},{"lightness":"-44"},{"weight":"2.39"},{"invert_lightness":true}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"visibility":"simplified"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"},{"lightness":"-16"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":"-25"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"},{"lightness":"-30"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"},{"lightness":"-62"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#8ac9cd"},{"visibility":"on"},{"saturation":"-33"},{"lightness":"13"},{"gamma":"0.84"},{"weight":"1.98"}]}]



App.addInfoWindowForRestaurant = function(restaurant, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <div class="info-window">
        <img class="restaurantImage"src=${ restaurant.image }>
        <p>${ restaurant.name }</p>
      </div>
      `
    });

    this.infoWindow.open(this.map, marker);
  });
};

// Add the functions to allow the user to login or register


App.register = function(e) {
  e.preventDefault();
  this.$main.html(`
  <form method="post" action="/register" class="container">
    <h2>Register</h2>
    <div class="form-group">
      <input class="form-control" type="text" name="user[username]" placeholder="Username">
    </div>
    <div class="form-group">
      <input class="form-control" type="email" name="user[email]" placeholder="Email">
    </div>
    <div class="form-group">
      <input class="form-control" type="password" name="user[password]" placeholder="Password">
    </div>
    <div class="form-group">
      <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
    </div>
    <input class="btn btn-primary" type="submit" value="Register">
  </form>
  `);
};

App.login = function(e) {
  e.preventDefault();
  this.$main.html(`
    <form method="post" action="/login" class="container">
      <h2>Login</h2>
      <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="btn btn-primary" type="submit" value="Login">
    </form>
  `);
};

App.handleForm = function(e) {
  e.preventDefault();

  const url    = `${App.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  $.ajax({
    url,
    method,
    data
  }).done(data => {
    if(data.token){
      $('.loggedIn').show();
      $('.loggedOut').hide();
      App.mapSetup();
    }
  }).fail(data => {
    console.log(data);
  });
};

App.logout = function(e) {
  e.preventDefault();
  $('.loggedIn').hide();
  $('.loggedOut').show();
  App.markersArray.forEach(marker => {
    marker.setMap(null);
  });
  return window.localStorage.clear();
};

App.init = function() {
  this.markersArray = [];
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  this.mapSetup();

  if (window.localStorage.getItem('token')) {
    $('.loggedIn').show();
    $('.loggedOut').hide();
  } else {
    $('.loggedIn').hide();
    $('.loggedOut').show();
  }
};

$(App.init.bind(App));
