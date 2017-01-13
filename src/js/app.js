const App = App || {};
const google = google;
App.mapSetup = function() {
  const canvas = document.getElementById('map-container');

  const mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(51.506178,-0.088369),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  this.map = new google.maps.LatLng(canvas, mapOptions);
  this.getApp();
};

App.getApp = function() {
  $.get('http://localhost:3000/restaurants').done(this.loopThroughArray);
};

App.loopThroughArray = function(data) {
  $.each(data, (index,app) => {
    App.addMarkerForApp(app);
  });
};

App.addMarkerForApp = function(app) {
  const latLng = new google.maps.Latlng(app.lat, app.lng);
};

const marker = new google.maps.Marker({
  position: latLng,
  map: this.map
});

this.addInfoWindowForApp(App,marker);

App.addInfoForApp = function(app, marker) {
  google.maps.event.addListener(marker, 'click', () => {
    if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
  });

    this.infoWindow = new google.maps.InfoWindow({
      content: `
      <div class = "info-window">
        <img src = ${ app.image }>
        <p>${ gym.name }</p>
        </div>
        `
    });

    

}
