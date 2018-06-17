//Create Variable to obtain quiz area & Cuntdown time
var panel = $("#quiz");
var startTime = 30;


//Question Sets

var questions = [
    //Question 1
    {
        question: "What was the first full length CGI movie?",
        choices: ["A bug's Life", "Monster Inc", "Toy Story", "The lion King"],
        correctChoice: "Toy True",
        image:"assets/images/toystory.gif"
    },
    //Question 2
    {
        question: "Which NBA team won the most titles in the 90s?",
        choices: ["New York Knicks", "Porland Trailblazers", "Los Angeles Lakers", "Chicago Bull"],
        correctChoice: "Chicago Bull",
        image: "assets/image/chicagobull.gif"
    },
    //Question 3
    {
        question: "Which of these is not a name of one of the Spice Girls?",
        choices: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
        correctChoice: "Fred Spice",
        image: "assets/images/spicegirls.gif"        
    },
    //Question 4
    {
        question: "Which group related the hit song, 'Smells Like Teen Spirit?'",
        choices: ["Nirvana", "Backstreet Boys", "No Doubt", "The Offspring"],
        correctChoice: "The Offspring",
        image: "assets/images/nirvanabark.gif"
    },
    //Question 5
    {
        question: "Which popular Disney movie featured the song, 'Circle of Life'",
        choices: ["Aldaddin", "Hercules", "Mulan", "The lion king"],
        correctChoice: "The lion king",
        image: "assets/images/lionking.gif"
    },
    //Question 6
    {
        question: "Finish this line from Fresh Prince of Bel - Air theme song: 'I whistled for a cab and when it came near, the license plate said ...'",
        choices: ["Dice", "Mirror", "Fresh", "Cab"],
        correctChoice: "Fresh",
        image: "assets/images/fresh.gif"
    },
    //Question 7
    {
        question: "What was Doug's best friend's name?",
        choices: ["Skeeter", "Mark", "Zach", "Cody"],
        correctChoice: "Skeeter",
        image: "assets/images/skeeter.gif"
    },
    //Question 8
    {
        question: "What was the name of the principal at Bayside High in Saved By The Bell?",
        choices: ["Mr.Zhou", "Mr.Digger", "Mr.Belding", "Mr.Page"],
        correctChoice: "Mr.Belding",
        image: "assets/images/belding.gif"
    }];


//Create game
var game = {
        questions: questions,
        currentQuestion: 0,
        counter: startTime,
        correct: 0,
        incorrect: 0,
        //Create count down function
        decrement: function() {
            game.counter--;
            $("#count-down").html(game.counter);

            if(game.counter === 0) {
                game.timeUp()
            }
        },
        //Create a function to load question
        loadQuestion: function() {
            timer = setInterval(game.decrement, 1000);
            panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
            for (i = 0; i<questions[this.currentQuestion].choices.length; i++){
                
                var buttonClicked = $("<button  id='button-clicked'" + "data-name='" + questions[this.currentQuestion].choices[i] + "'>" + questions[this.currentQuestion].choices[i] + "</button>")
                buttonClicked.addClass("thisChoice");
                panel.append(buttonClicked);
            }
        },

        //Create a function to load next question
        nextQuestion: function(){
            game.counter = startTime;
            $("#count-down").html(game.counter);
            game.currentQuestion++;
            game.loadQuestion();
        },

        //Create function for time up
        timeUp: function() {
            clearInterval(timer);
            $("#count-down").html(game.counter);

            panel.html("<h2>Out of Time!</h2>");
            panel.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctChoice);
            panel.append("<img src'" + questions[this.currentQuestion].image + "'/>");

            //create a condition to show game result after completing the last question
            if (game.currentQuestion === questions[7]){
                setTimeout(game.results, 3*1000);
            }
            else{
                setTimeout(game.nextQuestion, 3*1000);
            }
        },
        //Function to display game result
        results: function() {
            clearInterval(timer);

            //Display the game result
            panel.html("<h2>You have completed the quiz, here is your quiz result!</h2>");
            $("#count-down").html(game.counter);
            panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
            panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
            panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
            panel.append("<br>button id='start-over'>Start Over</button>");
        },
        //Function to click to check answer correction.
        clicked: function(){
            userChoice = $(".thisChoice");
            clearInterval(timer);

            if($(this.userChoice) === questions[this.currentQuestion].correctChoice) {
            this.rightChoice(); 
            }
            else{
                this.wrongChoice();
            }
        },
        //Function for rightchoice
        rightChoice: function(){
            game.correct++;
            clearInterval(timer);
            panel.html("<h2>Right Choice!</h2>");
            panel.append("<img src='" + questions[this.currentQuestion].image + "'/>");

            if(game.currentQuestion === questions[7]) {
                setTimeout(game.results, 3*1000);
            }
            else{
                setTimeout(game.nextQuestion, 3*1000);
            }   
        },
        //Function for wrong choice
        wrongChoice: function() {
            game.incorrect++;
            clearInterval(timer);
            panel.html("<h2>Wrong Choice!</h2>");
            panel.append("<img src='" + questions[game.currentQuestion].image + "'/>");

            if(game.currentQuestion === questions[7]){
                setTimeout(game.result, 3*1000);
            }
            else{
                setTimeout(game.nextQuestion, 3*1000);
            }
        },

        //Function to reset game
        resets: function() {
            this.currentQuestion = 0;
            this.counter = startTime;
            this.correct = 0;
            this.incorrect = 0;
            this.loadQuestion();
        }
};

//Click Events

$("#start").on("click", function() {
    $("#quiz-section").prepend("<h4>Time Remaining: <span id='count-down'>30</span></h4>");
    game.loadQuestion();
});

$("button").on("click", function() {
    game.clicked();
});

$("#start-over").on("click", function(){
    game.reset();
});




