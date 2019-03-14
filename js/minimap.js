
function mminitialize() {

    let guessMarker;
  
    // Mini map setup
    let mapOptions = {
      center: new google.maps.LatLng(59, 25, true),
      zoom: 6,
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
  
    let mMap = new google.maps.Map(document.getElementById('miniMap'), mapOptions);
  
    // Marker selection setup
    let guessMarkerOptions = new google.maps.Marker({
        map: mMap,
        visible: true,
        title: 'Sinu valik',
        draggable: false
        
    });
  
    // Mini map marker setup
    function setGuessMarker(guess) {
      if (guessMarker) {
        guessMarker.setPosition(guess);
      } else {
        guessMarker = new google.maps.Marker(guessMarkerOptions);
        guessMarker.setPosition(guess);
      };
    };
  
    // Mini map click
    google.maps.event.addListener(mMap, 'click', function(event) {
      window.guessLatLng = event.latLng;
      setGuessMarker(window.guessLatLng);
    });
  
  };