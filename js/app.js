//Create map with search box
//initial code from https://developers.google.com/maps/documentation/javascript/examples/places-searchbox

var kaunas = {lat: 54.898521, lng: 23.903597};

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: kaunas,
          zoom: 13,
          mapTypeId: 'roadmap'
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        //Define place list to be used in listview
        var placeList = document.getElementById('places');


        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          // Clear old list with the new search.
          placeList.innerHTML = "";
          });
          
          markers = [];

          // For each place, get the icon, name, and infowindow.
          var infowindow = new google.maps.InfoWindow();
          var bounds = new google.maps.LatLngBounds();

          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            });
            markers.push(marker);
            //add searchnresults to place listview
            placeList.innerHTML += '<li>' + place.name + '</li>';

            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            };
            //open infowindow of clicked marker
            //REF ref.: google maps API Udacity course
            marker.addListener('click', function() {
            populateInfoWindow(this, infowindow);
            });
            function populateInfoWindow(marker, infowindow){
              if(infowindow.markers != marker) {
                infowindow.markers = marker;
                infowindow.setContent('<div>' + marker.title + '</div>');
                infowindow.open(map, marker);
                //clear marker porperty when window is closed
                infowindow.addListener('closeclick', function() {
                  infowindow.marker = null;
                });
              }
            }
          });
          map.fitBounds(bounds);
        });
      }
