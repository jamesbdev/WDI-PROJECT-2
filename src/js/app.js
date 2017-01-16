const App    = App || {};
const google = google;

App.mapSetup = function() {
  App.$main.html('<div id="map-container"></div>');
  const canvas = document.getElementById('map-container');

  const mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
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

App.addMarkerForRestaurant = function(restaurant) {
  const latlng = new google.maps.LatLng(restaurant.lat, restaurant.lng);
  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map
  });

  this.addInfoWindowForRestaurant(restaurant ,marker);
};

App.addInfoWindowForRestaurant = function(restaurant, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <div class="info-window">
        <img src=${ restaurant.image }>
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
  <h2>Register</h2>
  <form method="post" action="/register">
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
    <h2>Login</h2>
    <form method="post" action="/login">
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
      App.mapSetup();
    }
  }).fail(data => {
    console.log(data);
  });
};

App.init = function() {
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  this.mapSetup();
};

$(App.init.bind(App));
