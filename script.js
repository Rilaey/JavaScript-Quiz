// setting varibles to our html ID's
let timerEl = document.getElementById('timer');
let startBtn = document.getElementById('start');
let questionCard = document.getElementById('question-card');
let leaderboardCard = document.getElementById('leaderboard-card');
let startMenu = document.getElementById('main-start');
let resultCard = document.getElementById('result-card');
let resultText = document.getElementById('result-text');

let time;
let currentQuestion;
let leaderboardArray;
let interval;

// hides result text
function hideResultMessage () {
    resultCard.style.display = 'none';
}

// hide everything besides the start 
function hideCards () {
    startMenu.setAttribute('hidden', true);
    questionCard.setAttribute('hidden', true);
    leaderboardCard.setAttribute('hidden', true);
}

// questions on quiz
const questions = [{
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
},
{
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
    ],
    answer: "4. all of the above",
},
{
    questionText: "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
},
{
    questionText: "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
        "1. JavaScript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
    ],
    answer: "4. console.log",
},
{
    questionText: "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
},
];

startBtn.addEventListener('click', startGame);

function startGame() {
   hideCards();
   questionCard.removeAttribute('hidden');

    //currentQuestion = 0;
    //showQuestion();
    
    time = 60;

    interval = setInterval(countDown, 1000);

    displayTime();
};

function countDown () {
    time --;
    displayTime()

    if(time === 0) {
        endGame()
    }
};

// display the timer on screen
function displayTime () {
    timerEl.textContent = time;
}

// show question and show 4 answers
function showQuestion () {
    let question = questions[currentQuestion];
    let choices = questions.choices;

    let questionEl = document.getElementById('question-text');
    questionEl.textContent = question.questionText;

    for (let x = 0; x < choices.length; x++) {
        let choices = choices[x];
        let choiceButton = document.getElementById('choice' + x);
        choiceButton.textContent = choices;
    }
};

document.getElementById('quiz-choices').addEventListener('click', checkAnswer);

function choiceIsCorrect(choiceButton) {
    return choiceButton.textContent = questions[currentQuestion].answer;
}

// if answer is wrong

function checkAnswer(eventChoice) {
    
}