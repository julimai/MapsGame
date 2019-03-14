$(document).ready(function() {

    let round = 1;
    let points = 0;
    let roundScore = 0;
    let totalScore = 0;
    ranOut = false;
    let distance;
 

     // service workeri käivitus
     registerServiceWorker()

    //  Init maps
 
    svinitialize();
    mminitialize();
 
    // Scoreboard & Guess button event

    // Init Timer
    resetTimer();

    // Reset Timer
    function resetTimer() {
      count = 10;
      counter = setInterval(timer, 1000);
    }
 
    // Timer
    function timer() {
      count = count - 1;
      if(count <= -1) {
        console.log('aeg läbi');
        if(round < 5) {
          ranOut = true;
          endRound();
        } else if(round >= 5) {
          endGame();
        }
        clearInterval(counter);
      }
      $("#timer").html(count);
    };
 
    // Guess Button
    $('#guessButton').click(function() {
      doGuess();
      rminitialize();
    });
 
    // End of round continue button click
    $('#roundEnd').on('click', '.closeBtn', function() {
      $('#roundEnd').fadeOut(500);
 
      // Reload maps to refresh coords
      svinitialize();
      mminitialize();
      rminitialize();
 
      // Reset Timer
      resetTimer();
      resetMarker();
     

      // Reset marker function
      function resetMarker() {
        //Reset marker
        if(guessMarker !== null) {
          guessMarker.setMap(null);
        }
      }
    });
 
    // End of game 'play again' button click
    $('#endGame').on('click', '.playAgain', function() {
      window.location.reload();
    });
 
    // Functions

//ServiceWorker
   function registerServiceWorker() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('js/serviceWorker.js').then(function (registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful: ', registration)
        }, function (err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err)
        })
      }
    }

    
    
 
    // Calculate distance between points function
    function calcDistance(fromLat, fromLng, toLat, toLng) {
      return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(fromLat, fromLng), new google.maps.LatLng(toLat, toLng));
    }
 
    function doGuess() {
      if(ranOut === false) {
 
        // Stop Counter
        clearInterval(counter);
 
        // Reset marker function
        function resetMarker() {
          //Reset marker
          if(guessMarker !== null) {
            guessMarker.setMap(null);
          }
        }
 
        // Explode latLng variables into separate variables for calcDistance function
        locLatLongs = window.locLL.toString();
        guessLatLongs = window.guessLatLng.toString();
 
        // Make arrays and clean from (){} characters
        window.locArray = locLatLongs.replace(/[\])}[{(]/g, '').split(',');
        window.guessArray = guessLatLongs.replace(/[\])}[{(]/g, '').split(',');
 
        // Calculate distance between points, and convert to kilometers
        distance = Math.ceil(calcDistance(window.locArray[0], window.locArray[1], window.guessArray[0], window.guessArray[1]) / 1000);
 
        // Calculate points awarded via guess proximity
        function inRange(x, min, max) {
          return(min <= x && x <= max);
        }
 
        // Real basic point thresholds depending on kilometer distances
        if(inRange(distance, 0, 1)) {
          points = 50;
        } else if(inRange(distance, 1, 3)) {
          points = 30;
        } else if(inRange(distance, 4, 6)) {
          points = 20;
        } else if(inRange(distance, 7, 10)) {
          points = 10;
        } else if(inRange(distance, 11, 20)) {
          points = 7;
        } else if(inRange(distance, 21, 30)) {
          points = 6;
        } else if(inRange(distance, 31, 50)) {
          points = 5;
        } else if(inRange(distance, 51, 100)) {
          points = 4;
        } else if(inRange(distance, 101, 150)) {
          points = 3;
        } else if(inRange(distance, 151, 200)) {
          points = 2;
        } else if(inRange(distance, 201, 250)) {
          points = 1;
        
        } else {
          points = 0;
        }
 
        if(round < 5) {
 
          endRound();
        } else if(round >= 5) {
          endGame();
        }
 
      } else {
 
        // They ran out
 
      }
 
      timer();
      window.guessLatLng = '';
 
    }
 
    function endRound() {
      round++;
      if(ranOut === true) {
        roundScore = 0;
      } else {
        roundScore = points;
        totalScore = totalScore + points;
      }
 
      $('.round').html('Käesolev voor: <b>' + round + '/5</b>');
      $('.roundScore').html('Eelmise vooru punktid: <b>' + roundScore + '</b>');
      $('.totalScore').html('Punktid kokku: <b>' + totalScore + '</b>');
 
      // If distance is undefined, that means they ran out of time and didn't click the guess button
      if(typeof distance === 'undefined' || ranOut === true) {
        $('#roundEnd').html('<p>Oh ei! Liiga kaua mõtlesid!.<br/> Sul ei õnnestunud saada ühtegi punkti!<br/><br/><button class="btn btn-primary closeBtn" type="button">Mängi edasi</button></p></p>');
        $('#roundEnd').fadeIn();
 
        // Stop Counter
        clearInterval(counter);
        resetMarker();
 
        // Reset marker function
        function resetMarker() {
          //Reset marker
          if(guessMarker !== null) {
            guessMarker.setMap(null);
          }
        }
        
        
        window.guessLatLng = '';
        ranOut = false;
 
        points = 0;
        
 
      } else {
        $('#roundEnd').html('<p>Sinu pakkumine oli<br/><strong><h1>' + distance + '</strong>km</h1> eemal tegelikust asukohast.<br/><div id="roundMap"></div><br/> Sul on kogutud<br/><h1>' + roundScore + ' punkti</h1> selles voorus!<br/><br/><button class="btn btn-primary closeBtn" type="button">Jätka</button></p></p>');
        $('#roundEnd').fadeIn();
      }
     
      // Reset Params
      window.guessLatLng = '';
      ranOut = false;
 
    }
 
    function endGame() {
 
      roundScore = points;
      totalScore = totalScore + points;
 
      $('#miniMap, #pano, #guessButton, #scoreBoard, #timer').hide();
      $('#endGame').html('<h1>Tubli!</h1><h2>Said kokku </h2><h1>' + totalScore + ' punkti!</h1><br/><button class="btn btn-large btn-success playAgain" type="button">Mängid uuesti?</button>');
      $('#endGame').fadeIn(500);
 
      
 
      // We're done with the game
      window.finished = true;
    }
});