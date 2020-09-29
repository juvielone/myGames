
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var gamePattern = [];

var level = 0;   
var start = true;

// Random Functions
function nextSequence(){
    //Stack up pattern when next sequence is called
    userClickedPattern = [];

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    
    $("."+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    
    level++;
    $("#level-title").text("Level "+level);      
}

// Clicked Functions

$(".btn").on("click",function(){
    
    
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    
    animatePress(userChosenColour);
    playSound(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

// Play Sounds for both random and click functions

function playSound(name){
    var audio1 = new Audio("sounds/" + name + ".mp3");
    audio1.play();
    }
    
    
    function animatePress(currentColour){
        
        $("."+currentColour).addClass("pressed");
        
        setTimeout(function(){
            $("."+currentColour).removeClass("pressed");
        }, 100);
        
        
    }
    

    
    //Detecting keypress
    $("body").on("keydown",function(){
        
        if(start){
            nextSequence();
            start=false;


        }        
        
    })

    
    
//Matching

    function checkAnswer(currentLevel){
        //Matching colors
        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            console.log("success");
            //mAtching numbers
            if(userClickedPattern.length === gamePattern.length){

                setTimeout(function(){
                        nextSequence();
                }, 1000);
            }



        }else{
            $("body").addClass("game-over");

            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200)

            $("#level-title").text("Game Over, Press Any Key to Restart");
            playSound("wrong");
            startOver();
        }

    }



function startOver(){
    level = 0;
    gamePattern=[];
    start = true;
}




    
    
    
    
    

