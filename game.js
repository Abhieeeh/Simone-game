//define the colors
var colors = ["red", "blue", "green", "yellow"];

//created a array to store thegame pattern
var gamepattern = [];

//created an array to store what user clicks
var userclicks = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    maingame();
    $("h1").html("Level  " + level);
    started = true;
  }
});

$(".btn").click(function () {
  //calling the main game function

  //created a variable to store the id of the button clicked
  var clickedbtn = $(this).attr("id");
  //audio=new Audio("sounds/"+clickedbtn+".mp3");
  //audio.play();
  //pushed the id to the userclicks array, set id as the name of the colors
  userclicks.push(clickedbtn);
  clickanimation(clickedbtn);
  playsound(clickedbtn);
  lngth = userclicks.length - 1;
  result(lngth);

  //console.log(userclicks);
});

function maingame() {
  // variable to store the random numbers for colors
  var randomnumber = Math.floor(Math.random() * 3) + 1;

  //push the random colors to the array created before named gamepattern
  gamepattern.push(colors[randomnumber]);

  //blink the random color
  $("#" + colors[randomnumber])
    .fadeOut(100)
    .fadeIn(100);
  playsound(colors[randomnumber]);
  level++;
  $("h1").html("Level  " + level);
}

function result(lngth) {
  if (gamepattern[lngth] === userclicks[lngth]) {
    console.log("success");

    if (userclicks.length === gamepattern.length) {
      setTimeout(function () {
        maingame();
        userclicks = [];
      }, 1000);
    }
  } else {
    console.log("wrong");
    gameover();
    startover();
  }
}

function gameover() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  playsound("wrong");
  $("h1").html("Game Over, Press Any Key to Restart");
}

function playsound(name) {
  audio = new Audio(name + ".mp3");
  audio.play();
}

function clickanimation(clickedbtn) {
  $("#" + clickedbtn).addClass("pressed");
  setTimeout(function () {
    $("#" + clickedbtn).removeClass("pressed");
  }, 100);
}

function startover() {
  level = 0;
  started = false;
  gamepattern = [];
  userclicks = [];
}
