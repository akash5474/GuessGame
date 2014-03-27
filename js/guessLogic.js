$("document").ready(function() {

  var val = guessRandom()
    , m = $("#marquee")
    , guessCount = $("#guess-count")
    , count = 5
    , guessList = {}
    , guess
    , retString
    , vert;

  function guessRandom() {
    return Math.floor(Math.random()*100)+1;
  }

  function evalGuess( guess ) {
    var vert = guess > val ? "LOWER" : "HIGHER"
      , diff = Math.abs( guess - val )
      , temp;

    console.log( "Diff:", diff, vert );

    if ( diff === 0 ) {
      var correct = '<span id="win">CORRECT</span>';
      m.empty();
      m.append('Good guess! You are '+correct+'!');
      guessCount.text( "You Win!" );
      $("#guess-list ul").append("<li>"+guess
          +' | '+correct+'</li>');

      changeStyles(0);
      count = -1;
      return true;
    } else if ( diff <= 3 ) {
      temp = '<span id="fiery">FIERY HOT</span>';
    } else if ( diff <= 8 && diff > 3 ) {
      temp = '<span id="hot">HOTTER</span>';
    } else if ( diff <= 15 && diff > 8 ) {
      temp = '<span id="warm">WARMER</span>';
    } else if ( diff <= 32 && diff > 15 ) {
      temp = '<span id="cold">COLDER</span>';
    } else {
      temp = '<span id="ice">ICE COLD</span>';
    }

    guessList[guess] = temp;

    $("#guess-list ul").append("<li>"+guess+" | "+temp+"</li>");
    m.empty();
    m.append("You are getting "+temp+"! "+"Guess "+vert+"!");
  }

  function updateGuessCount() {
    guessCount.text( count.toString() + " Guesses Remaining" );
  }

  function changeStyles(opt) {
    if ( opt === 0 ) {
      $("body").css( {backgroundColor: "#90ee90"} );
      $("#tab").css( {backgroundColor: "#e7f6eb"} );
      $(".navbar").css( {backgroundColor: "#e7f6eb"} );
      $("body").css( {color: "#747b79"} );
      $("#guess-count").css( {color: "#fff"} );
    } else if ( opt === 1 ) {
      $("body").css( {backgroundColor: "#e7f6eb"} );
      $("#tab").css( {backgroundColor: "#90ee90"} );
      $(".navbar").css( {backgroundColor: "#90ee90"} );
      $("body").css( {color: "#fff"} );
      $("#guess-count").css( {color: "#747b79"} );
    }
  }

  function submitGuess() {
    var inp = $("input").val().trim()
      , guess = parseInt( inp );

    if ( guess <= 100 && guess > 0
          && inp.search(/[^0-9]/) === -1 ) {

      if ( guess in guessList ) {
        m.text("You have already guessed this number!");
        return;
      }

      if ( count > 1 ) {
        count--;
        updateGuessCount();
        evalGuess( guess );
      } else if ( count === -1) {
        guessCount.text( "You have already won!" );
        m.text( "Press Play Again!" );
      } else {
        if ( evalGuess( guess ) ) {
          return;
        } else {
          guessCount.text( "You have no guesses left!" );
          m.text( "Press Play Again!" );
        }
      }
    } else {
      alert( "You must input a number 1-100!" );
    }
  }

  $("#submit").on('click', function() {
    submitGuess();
  });

  $("input").on('keydown', function(ev) {
    if ( ev.keyCode === 13 ) {
      submitGuess();
    }
  })

  $("#hint").on('click', function() {
    if ( count < 5 ) {
      guessCount.text( val.toString() );
    } else {
      alert( "You must first submit a guess!" );
    }
  });

  $("#replay").on('click', function() {
    val = guessRandom();
    count = 5;
    guessList = {};

    $("#guess-list ul").empty();
    changeStyles(1);
    updateGuessCount();
    m.text("Guess a number between 1 and 100");
  });
});