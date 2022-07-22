var gamePattern = [];
var userClickedPattern =[];
var buttonColours = ["red", "blue", "green", "yellow"];
var started = false;
var level=0;

function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level "+ level);
}

$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

if(checkAnswer(userClickedPattern.length) === false){
  var sWrong=new Audio("sounds/wrong.mp3");
  sWrong.play();
  $("body").addClass("game-over");
  setTimeout(function(){
 $("body").removeClass("game-over");
}, 200);
$("h1").text("Game Over, Press Any Key to Restart");
startOver();
} else{
  if (userClickedPattern.length === level){
    userClickedPattern =[];
    myTimeout = setTimeout(nextSequence, 1000);
  }
}

});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+ currentColour).addClass("pressed");
  setTimeout(function(){
 $("#"+ currentColour).removeClass("pressed");
}, 100);
}

$(document).keydown(function(){
    if(started===false){
      $("h1").text("Level 0");
      nextSequence();}
      started = true;

});
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel-1] === userClickedPattern[currentLevel-1]){
    return true;
  } else {
    return false;
}
}
function startOver(){
  level=0;
  userClickedPattern =[];
  gamePattern =[];
  started = false;
}
