



//Create map with search box
//initial code from Udacity course project 12
var map, marker, infowindow, bounds;
var jonkoping = {lat: 57.782614, lng: 14.161788};

//var locations = [];
var markers = [];

function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: jonkoping,
          zoom: 13,
          radius: '500',
          mapTypeId: 'roadmap',
          mapTypeControl: false
        });


        var request = {
          location: map.getCenter(),
          radius: '1000',
          query: 'skola Jönköping',
          type: 'education'
        };


        var placeList = document.getElementById('places');

        //Set the boundaries to fit everythign the user can see
        // It captures the South-West adn North-East corners of the viewport
        var bounds = new google.maps.LatLngBounds();
        infowindow = new google.maps.InfoWindow();


        var service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);

        function callback(results, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              var places = results[i];
              var icon = {
                url: places.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

              var li = document.createElement('li');
              li.innerHTML = '<li>' + '<strong>' +places.name + '</strong>'
              + '<br>' + places.formatted_address + '</li>';
              var listInput = placeList.appendChild(li);
              //map.controls[google.maps.ControlPosition.TOP_LEFT].push(listInput);

              marker = new google.maps.Marker({
              map: map,
              icon: icon,
              title: places.name,
              position: places.geometry.location
              });

              markers.push(marker);
              //open infowindow of clicked marker
              //REF ref.: google maps API Udacity course
              marker.addListener('click', function() {
                populateInfoWindow(this, infowindow);
              });

              function populateInfoWindow(marker, infowindow){
                if(infowindow.marker != marker) {
                  infowindow.markers = marker;
                  infowindow.setContent('<div>' + marker.title + " " + marker.position + '</div>');
                  infowindow.open(map, marker);

                  //clear marker porperty when window is closed
                  infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                  });
                }
              }
            }
          }
        }
}

/*
        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        // For each place, get the icon, name, and infowindow.
        infowindow = new google.maps.InfoWindow();
        bounds = new google.maps.LatLngBounds();


        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.

        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          console.log(places);

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
            placeList.innerHTML += '<li>' + place.name + "" +
            place.formatted_address + '</li>';


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
                infowindow.setContent('<div>' + marker.title + place.formatted_address + '</div>');
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
      //  google.maps.event.addDomListener( window, 'load', initialize );
      }
*/
