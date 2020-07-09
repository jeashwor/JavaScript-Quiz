// Declare Global Variables related to API 
var timerEl = document.getElementById("timer");
var questionEl = document.getElementById("questions");
var answerDeclarationEl = document.getElementById("correct");
var answerAEl = document.getElementById("a");
var answerBEl = document.getElementById("b");
var answerCEl = document.getElementById("c");
var answerDEl = document.getElementById("d");
var firstEl = document.getElementById("first");
var questionBoxEl = document.getElementById("questionBox");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");
var scorePageEl = document.getElementById("scorePage");
var scoreEl = document.getElementById("score");
var HSInitialsEl = document.getElementById("HSInitials");
var submitEl = document.getElementById("submit");

// Create Object with list of questions, possible answers, and correct answer
var questionList = [
    {
        question: "Which of the following is not a 'Data Type' in JavaScript?",
        a: 'Undefined',
        b: 'Boolean',
        c: 'String',
        d: 'Case',
        correct: 'd'
    },
    {
        question: "What does NaN stand for in JavaScript?",
        a: 'Not-A-Number',
        b: 'Sodium Nitride',
        c: 'Numerically-Appended-Number',
        d: 'Number-Action-Network',
        correct: 'a'
    },
    {
        question: "A _____ Variable  will be visible only within a function where it is defined.",
        a: 'Global',
        b: 'Child',
        c: 'Local',
        d: 'Parent',
        correct: 'c'
    },
    {
        question: "Which biult-in method can be used to return a character at a a specivied index?",
        a: 'Concat()',
        b: 'CharAt()',
        c: 'push()',
        d: 'indexOf',
        correct: 'b'
    },
    {
        question: "JavaScript variable names are ________?",
        a: 'numbers',
        b: 'case sensitive',
        c: 'not changable',
        d: 'single use',
        correct: 'b'
    },
    {
        question: "Which JavaScript operator will allow you to see if a remainder is generated?",
        a: '%',
        b: '==',
        c: '/',
        d: '===',
        correct: 'a'
    },
    {
        question: "Which JavaScript operator is used to make sure things are equal in both value and type?",
        a: '<=',
        b: '==',
        c: '=',
        d: '===',
        correct: 'd'
    },
    {
        question: "The _________ method returns the element that has the ID attribute with the specified value.",
        a: 'getElementBy#("")',
        b: 'getElementByClass("")',
        c: 'getElementById("")',
        d: 'getElementByTagName("")',
        correct: 'c'
    },
    {
        question: "Which of the following is not a way to define a variable in JavaScript?",
        a: 'var x =',
        b: 'const x =',
        c: 'let x =',
        d: 'give x =',
        correct: 'd'
    },
    {
        question: "______ variables are those that are declared in the program but have not been given any value.",
        a: 'NaN',
        b: 'Undeclared',
        c: 'Undefined',
        d: 'Undiscovered',
        correct: 'c'
    },
]

// Establish global variables needed for timer, question counting, and final high score display
var lastQuestion = questionList.length - 1;
var questionIndex = 0;
var timer = 100;
var highScoreCounter = 0;

// Function to start game.
function start() {
    event.preventDefault();
    timerEl.innerHTML = timer;
    timerUpdate();
    firstEl.classList.add("d-none");
    questionBoxEl.classList.remove("d-none");
    askQuestions();
};

// Function to display each question or switch to Initial submit screen
function askQuestions() {
    if (questionIndex < 10) {
        questionEl.innerHTML = questionList[questionIndex].question;
        answerAEl.innerHTML = questionList[questionIndex].a;
        answerBEl.innerHTML = questionList[questionIndex].b;
        answerCEl.innerHTML = questionList[questionIndex].c;
        answerDEl.innerHTML = questionList[questionIndex].d;
    } else {
        setTimeout(function () {
            questionBoxEl.classList.add("d-none");
            scoreEl.innerHTML = "Your final score is " + timer;
            timerEl.innerHTML = timer;
            scorePageEl.classList.remove("d-none");
        }, 500);
    }
};

// Function to begin timer and update header display accordingly
function timerUpdate() {
    var myInterval = setInterval(function () {
        if (timer == 0 || questionIndex == 10) {
            clearInterval(myInterval);
        } else {
            timer--;
            timerEl.innerHTML = timer;
        }
    }, 1000);
};

// Function to check button click of answers against question object index.
function checkAnswer(answer) {
    if (answer == questionList[questionIndex].correct) {
        // answer is correct
        questionIndex++;
        correctEl.classList.remove("d-none");
        askQuestions();
        setTimeout(function () {
            correctEl.classList.add("d-none");
        }, 500);
    } else {
        // answer is wrong
        questionIndex++;
        wrongEl.classList.remove("d-none");
        askQuestions();
        timer = timer - 10;
        setTimeout(function () {
            wrongEl.classList.add("d-none");
        }, 500);
    }
};

// Function to to take data from Initials field in form and store into local Storage for use.
// Changes page to highScore.html
function initialSubmit() {
    event.preventDefault();
    var userInput = HSInitialsEl.value;
    console.log(localStorage.getItem("initials.user"));
    highScoreCounter++;
    if (localStorage.getItem("initials") === null) {
        var players = [];
        players.push({ "user": userInput, "score": timer });
        localStorage.setItem("initials", JSON.stringify(players));
    } else {
        var players = JSON.parse(localStorage.getItem("initials"));
        players.push({ "user": userInput, "score": timer });
        localStorage.setItem("initials", JSON.stringify(players));
    }
    location.href = "./highScore.html"
};

// Adds high score from quiz to highScore.html page
function addHighScore() {
    var highScoreLocationEl = document.getElementById("highScoreLocation");
    var userScores = localStorage.getItem("initials");
    if (userScores !== null) {
        var newUserScoreObject = JSON.parse(userScores);
        sortArray(newUserScoreObject);
        for ( var i = 0; i <= newUserScoreObject.length; i++) {
            var newScoreDiv = document.createElement("li");
            newScoreDiv.setAttribute("class", "scoreItem");
            newScoreDiv.setAttribute("id", "hs" + highScoreCounter);
            newScoreDiv.innerHTML = newUserScoreObject[i].user + " - " + newUserScoreObject[i].score;
            highScoreLocationEl.append(newScoreDiv);
        }
    }
}

// Function to clear scores in local storage and on screen when button is pressed.
function clearScore() {
    localStorage.removeItem("initials");
    var hsItemEl = document.getElementsByClassName("scoreItem");
    hsItemEl.remove();
    highScoreCounter = 0;
};

// Function to sort array in order of highest score first
function sortArray(array) {
    array.sort((a, b) => b.score - a.score); 
}



