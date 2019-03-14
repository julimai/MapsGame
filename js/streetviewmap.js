    
      function svinitialize() {

        console.log('Ei spikerda!');

        let coordArray = ['58.431660,23.688284','58.034702,24.461668','58.106260,25.565378','57.780789,26.033706','58.949388,23.544369','58.527465,22.699391','58.846897,26.948025','58.813033,26.542427','58.530090,26.697327','58.153711,26.225715','57.802017,27.525318'];
        let randCoord = coordArray[Math.floor(Math.random() * coordArray.length)];
        coordArrayLatLongs = randCoord.replace(/[\])}[{(]/g,'').split(',');

        window.locLL = coordArrayLatLongs[0]+","+coordArrayLatLongs[1];

        // Do streetview
        let whoamiLocation = new google.maps.LatLng(coordArrayLatLongs[0],coordArrayLatLongs[1]);
        let streetViewService = new google.maps.StreetViewService();
        let STREETVIEW_MAX_DISTANCE = 100;

        streetViewService.getPanoramaByLocation(whoamiLocation, STREETVIEW_MAX_DISTANCE, function (streetViewPanoramaData, status) {
            if (status === google.maps.StreetViewStatus.OK) {

              // We have a streetview pano for this location, so let's roll
              let panoramaOptions = {
                position: whoamiLocation,
                addressControl: false,
                linksControl: false,
                pov: {
                  heading: 270,
                  zoom: 1,
                  pitch: -10
                },
                visible: true
              };
              let panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);

            } else {
                // no street view available in this range, or some error occurred
                alert('Streetview vaadet ei leitud selle koha jaoks.');
            }
        });

      };