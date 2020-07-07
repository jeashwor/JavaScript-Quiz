// Declare Global Variables
var quizStartEl = document.getElementById("quizStart");
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

var lastQuestion = questionList.length -1;
var questionIndex = 0;
var timer = 100;





function askQuestions() {
    questionEl.innerHTML = questionList[questionIndex].question;
    answerAEl.innerHTML = questionList[questionIndex].a;
    answerBEl.innerHTML = questionList[questionIndex].b;
    answerCEl.innerHTML = questionList[questionIndex].c;
    answerDEl.innerHTML = questionList[questionIndex].d;
}

function timerUpdate() {
    var myInterval = setInterval(function () {
        timer--;
        timerEl.innerHTML = timer;
        if (timer == 0) {
            clearInterval(myInterval);
        }
    }, 1000)
}

function checkAnswer(answer) {
    if ( answer == questionList[questionIndex].correct) {
        // answer is correct
        questionIndex++;
        correctEl.classList.remove("d-none");
        setTimeout(function() {
            correctEl.classList.add("d-none");
            askQuestions();
        }, 2000);
    } else {
        // answer is wrong
        questionIndex++;
        wrongEl.classList.remove("d-none");
        timer = timer - 10;
        setTimeout(function() {
            wrongEl.classList.add("d-none");
            askQuestions();
        }, 2000);
    }
} 

quizStartEl.addEventListener("click", function (event) {
    timerEl.innerHTML = timer;
    timerUpdate();
    firstEl.classList.add("d-none");
    questionBoxEl.classList.remove("d-none");
    askQuestions();
})



