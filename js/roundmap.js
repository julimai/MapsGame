
function rminitialize() {
    console.log('Tase läbitud');

      let currentLLArr = locLatLongs.replace(/[\])}[{(]/g,'').split(',');
      let GuessLLArr = guessLatLongs.replace(/[\])}[{(]/g,'').replace(/\s/g, "").split(',');
      let actualLtLng = new google.maps.LatLng(currentLLArr[0],currentLLArr[1]);
      let guessLtLng = new google.maps.LatLng(GuessLLArr[0],GuessLLArr[1]);
  
      let mapOptions = {
        zoom: 6,
        center: new google.maps.LatLng(59, 25, true),
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      let map = new google.maps.Map($('#roundMap')[0], mapOptions);
  
      let actualMarker = new google.maps.Marker({
          position: actualLtLng,
          title:"Actual Location",
          icon: 'img/actual.png'
      });
  
      let guessMarker = new google.maps.Marker({
          position: guessLtLng,
          title:"Your Guess",
          icon: 'img/guess.png'
      });
  
      // To add the marker to the map, call setMap();
      actualMarker.setMap(map);
      guessMarker.setMap(map);
  
  };