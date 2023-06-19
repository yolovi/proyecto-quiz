//El Quiz constará de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
// Deberán ser preguntas que vengan de https://opentdb.com/ o otras API’s que busqueis.Utiliza AXIOS
// La aplicación tendrá que ser una SPA (single-page application). Sólo una pregunta cada vez en pantalla.

//API QUIZ - AXIOS: https://opentdb.com/api.php?amount=10

//TODO: BORRAR todos los COMENTARIOS antes de entregar

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
const answerContainer = document.getElementById("answer-container");

// Creamos las variables con array vacio para la API y para lo que queremos guardar de la API

let apiData = [];
let apiDataNew = [];

// peticion datos API
axios
.get("https://opentdb.com/api.php?amount=10")
.then((res) => (apiData = res.data.results))
.catch((err) => console.error(err));

setTimeout(() => {
    console.log(apiData);
}, "1000");

//FUNCIONES

// NUEVA ESTRUCTURA: guardar question & answers en nuevo [] con {} dentro con key correct con valor true/false.

function getQuestions() {
  setTimeout(() => {
    apiDataNew = apiData.map((elemento) => {
      let correctAnswer = { text: elemento.correct_answer, correct: true };
      let incorrectAnswers = elemento.incorrect_answers.map((incorrect) => {
        return {
          text: incorrect,
          correct: false,
        };
      });
      return {
        question: elemento.question,
        allAnswers: [...incorrectAnswers, correctAnswer],
      };
    });
    console.log("apiDataNew", apiDataNew);
  }, 1000);
}

getQuestions();

//Esta funcion esta conectada al boton start del quiz. Esconde el boton start al clicar y muestra el contenedor con la primera pregunta:

// let currentQuestionIndex;

function startGame() {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");

  setNextQuestion();
}

function showQuestion(currentQuestion) {

  
    // apiDataNew.forEach((element) => {
    //     questionElement.innerText = element.question;
    // });

  questionElement.innerText = currentQuestion.question;
  currentQuestion.allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = true;
    }
    answerContainer.appendChild(button);
  });
}


function setNextQuestion() {
    showQuestion(apiDataNew[currentQuestionIndex]);
    }

//EVENT LISTENER
startButton.addEventListener("click", startGame);
