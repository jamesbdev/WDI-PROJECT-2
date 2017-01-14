const App = App || {};
const google = google;

App.mapSetup = function() {
  const canvas = document.getElementsById('map-container');

  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.Map(canvas, mapOptions);
  this.getApps();
};

App.getApps = function() {
  $.get('http://localhost:3000/restaurants').done(this.loopThroughArray);
};

App.loopThroughArray = function(data) {
  $.each(data, (index, app)=> {
    App.addMarkerForApp(app);

  });
};

Gym.addMarkerForApp = function(gym) {
  const latlng = new google.maps.LatLng(gym.lat, gym.lng);

  const marker = new google.maps.Marker({
    position: latlng,
    map: this.map
  });

  this.addInfoWindowForApp(app,marker);

  App.addInfoWindowForApp = function(app, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();

    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <div class="info-window">
        <img src=${ app.image }>
        <p>${ app.name }</p>
      </div>
      `
    });

    this.infoWindow.open(this.map, marker);
  });
};

$(Gym.mapSetup.bind(Gym));




}
