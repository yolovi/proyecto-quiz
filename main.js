//El Quiz constará de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
// Deberán ser preguntas que vengan de https://opentdb.com/ o otras API’s que busqueis.
// La aplicación tendrá que ser una SPA (single-page application). Sólo una pregunta cada vez en pantalla.


//GET_ITEMS

//div Home Page
const homePage = document.getElementById("home-page");
const btnTakeQuiz = document.getElementById("take-quiz");
//div Question Page
const questionPage = document.getElementById("question-page");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const answerButtonsContainer = document.getElementById("answer-buttons");


//FUNCIONES

let currentQuestionIndex;

function startGame() {
startButton.classList.add("hide");
currentQuestionIndex = 0;
questionContainer.classList.remove("hide");
}


//EVENT LISTENER
startButton.addEventListener("click", startGame);