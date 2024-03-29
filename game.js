
var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }    
});

$(".btn").click(function() {

    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    //2*Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

//1*Create a new function called checkAnswer(), take one input with the name currentLevel.
function checkAnswer(currentLevel){
    //3*check if the most recent user answer is the same as the game pattern. 
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            
            //4*If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
            if(userClickedPattern.length === gamePattern.length){

                //5*Call nextSequence() after a 1000 millisecond delay.
                setTimeout(function() {
                    nextSequence();
                }, 1000);  //1sec
            }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);    //0.2sec

        startOver();
    }
}

function nextSequence(){

    //6*Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour= buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    },100);    //0.1sec
}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function startOver(){
    //reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern=[];
    started=false;
}
