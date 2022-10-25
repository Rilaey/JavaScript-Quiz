// declare varibales on the global scope
let startCard = document.getElementById('start-card');
let questionCard = document.getElementById('question-card');
let scoreCard = document.getElementById('score-card');
let leaderboardCard = document.getElementById('leaderboard-card');
let resultDiv = document.getElementById('result-div');
let resultText = document.getElementById('result-message');
let scoreEl = document.getElementById('score');
let inputEl = document.getElementById('init');
let submitButton = document.getElementById('sub-btn');
let inputElement = document.getElementById('inits');
let backBtn = document.getElementById('back-btn');
let clearBtn = document.getElementById('clear-button');
let score = document.getElementById('score');
let leaderboardHref = document.getElementById('leaderboard-href');
let highscoreArr = document.getElementById('highscore-arr');
let displayTime = document.getElementById('time');

let time;
let interval;
let leaderboardArr;
let currentQuestion;

backBtn.addEventListener('click', returnToStart);
document.getElementById('start-btn').addEventListener('click',startTest);
document.getElementById('quiz-choices').addEventListener("click", checkAnswer);
submitButton.addEventListener("click", storeScore);
clearBtn.addEventListener("click", clearHighscores);
leaderboardHref.addEventListener('click', appearLeaderboard);

// on page load hide all cards aside from start card

function hideCards(){
    startCard.setAttribute("hidden",true);
    questionCard.setAttribute("hidden",true);
    scoreCard.setAttribute("hidden",true);
    leaderboardCard.setAttribute("hidden",true);
}

// quiz questions in objects

// question 1 
let questions = [{
    questionText: "What are some commonly used data types?",
    options: ["1. alerts", "2. promts", "3. strings", "4. buttons"],
    answer: "3. strings",
},
// question 2 
{
    questionText: "What HTML element do we use to put JavaScript inside?",
    options: ["1. <script>", "2. <javascript>", "3. <input>", "4. no element needed",],
    answer: "1. <script>",
},
// question 3 
{
    questionText: "How do you alert a message on page load?",
    options: ["1. promt('')", "2. alert('')", "3. yell('')", "4. hello('')"],
    answer: "2. alert('')",
},
// question 4 
{
    questionText: "What is the correct way to write a function with the name 'test' ?",
    options: [    "1. enable test()", "2. go test()", "3. function test()", "4. test()",],
    answer: "3. function test()",
},
// question 5 
{
    questionText: "How do you write a comment in JavaScript??",
    options: ["1. ''comment", "2. //comment", "3. ++comment", "4. ==comment"],
    answer: "2. comment",
},
];


// hide results section
function hideResultText(){
    resultDiv.style.display = "none";
}

function startTest(){
    // removing the hidden attribute so it is the only card shown
    hideCards();
    questionCard.removeAttribute("hidden");

    currentQuestion = 0;
    displayQuestion();

    // when start button is pressed, count down is set to 60 seconds
    time = 60;
    
    interval = setInterval(countdown,1000);

    // initiate displayCount function. so on click countdown will appear in top right of page on start quiz action.
    displayCount();
}

function countdown(){
    time--;
    displayCount();

    if(time < 1){
        endTest();
    }
}

function displayCount(){
    displayTime.textContent = time;
}
//display the question and answer option for the current question
function displayQuestion(){
    let question = questions[currentQuestion];
    let options = question.options;

    let h2QuestionElement = document.querySelector("#question-text");
    h2QuestionElement.textContent = question.questionText;

    for(let x = 0; x < options.length; x++) { 
        let option = options[x];
        let optionButton = document.querySelector("#option" + x);
        optionButton.textContent = option;

    }
}

// compare answer with user selected choice
function choiceIsCorrect(optionButton) {
    return optionButton.textContent === questions[currentQuestion].answer;
}

//if answer is incorrect lower timer
function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    resultDiv.style.display = "block";
    if (choiceIsCorrect(optionButton)) {
        resultText.textContent = "Correct!";
        setTimeout(hideResultText, 1000);
    } else {
        resultText.textContent = "Incorrect!";
        setTimeout(hideResultText, 1000);
        if (time >= 10) {
            time = time - 10;
            displayCount();
        } else {
            time = 0;
            displayCount();
            endTest();
        }
    }

    currentQuestion++;
  
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endTest();
    }
}

// when test id over, show only score card, clear timeer, and provide score.
function endTest() {
    clearInterval(interval);
    hideCards();
    scoreCard.removeAttribute("hidden");
    score.textContent = time;
}

function storeScore(event) {
    //prevent default behaviour of form submission
    event.preventDefault();

    //if initials are not valid (nothing is written)
    if (!inputElement.value) {
        alert("Please enter your initials before pressing submit!");
        return;
    }

    //store score and initials in an object
    let leaderboardItem = {
        inits: inputElement.value,
        score: time,
    };

    updateStoredLeaderboard(leaderboardItem);

    hideCards();
    leaderboardCard.removeAttribute("hidden");

    displayLeaderboard();
}

//updates local storage with leaderboard entrys
function updateStoredLeaderboard(leaderboardItem) {
    let leaderboardArr = getLeaderboard();
    leaderboardArr.push(leaderboardItem);
    localStorage.setItem("leaderboardArr", JSON.stringify(leaderboardArr));
}


//get "leaderboardArr" from local storage (if it exists) and parse it into a javascript object using JSON.parse
function getLeaderboard() {
    let storedLeaderboard = localStorage.getItem("leaderboardArr");
    if (storedLeaderboard !== null) {
        let leaderboardArr = JSON.parse(storedLeaderboard);
        return leaderboardArr;
    } else {
        leaderboardArr = [];
    }
    return leaderboardArr;
}

function displayLeaderboard() {
    let sortedLeaderboardArr = gatherLeaderboard();
    highscoreArr.innerHTML = "";
    for (let x = 0; x < sortedLeaderboardArr.length; x++) {
        let leaderboardEntry = sortedLeaderboardArr[x];
        let newListItem = document.createElement("li");
        newListItem.textContent=leaderboardEntry.inits + leaderboardEntry.score;
        highscoreArr.append(newListItem);
    }
}

//sort leaderboard array from lowest to highest scores
function gatherLeaderboard() {
    let leaderboardArr = getLeaderboard();
    if (!leaderboardArr) {
        return;
    }

    leaderboardArr.sort(function(a, b) {
        return b.score - a.score;
    });
    return leaderboardArr;
}

// clear local storage and display empty leaderboard
function clearHighscores() {
    localStorage.clear();
    displayLeaderboard();
}

// when user exits leaderboard, show start screen and hide all other cards
function returnToStart() {
    hideCards();
    startCard.removeAttribute("hidden");
};

function appearLeaderboard() {
    hideCards();
    leaderboardCard.removeAttribute("hidden");

    // reset test clock to 0
    clearInterval(interval);
    
    displayCount();

    //display leaderboard on leaderboard card
    displayLeaderboard();
};