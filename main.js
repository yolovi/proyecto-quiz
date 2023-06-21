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
const scorePageBtn = document.getElementById("score-page-btn");
const answerContainer = document.getElementById("answer-container");
const answerButtons = document.getElementById("answer-container");
const questionNumber = document.getElementById("question-number");
//div Score PAge
const scorePage = document.getElementById("score-page");
const scoreText = document.getElementById("score-text");
const scoreNumber = document.getElementById("score-number-btn");
const restartBtn = document.getElementById("restart-btn");

// Creamos las variables con array vacio para la API y para lo que queremos guardar de la API

let apiData = [];
let apiDataNew = [];
let currentQuestionIndex;
let score = 0;

// peticion datos API
axios
  .get("https://opentdb.com/api.php?amount=10")
  .then((res) => (apiData = res.data.results))
  .catch((err) => console.error(err));

// setTimeout(() => {
//   console.log(apiData);
// }, "1000");

//FUNCIONES

//TODO: aync await
//TODO: funciones flecha
//TODO: funcion d-none views (opcional). ver diapos clase users-login
//TODO: EXTRA CLASE. Guardar en el Local Storage cada puntuacion
//TODO: EXTRA CLASE. Grafica
//TODO: EXTRA. navbar

// NUEVA ESTRUCTURA: guardar question & answers en nuevo [] con {} dentro con key correct con valor true/false.
// added sort math random en allAnswers para que salgan desordenadas

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
        allAnswers: [...incorrectAnswers, correctAnswer].sort(function () {
          //Array elements now scrambled
          return 0.5 - Math.random();
        }),
      };
    });
    console.log("apiDataNew", apiDataNew);
  }, 1000);
}

getQuestions();

//Ejemplo como desordenar array de manera aleatoria:
// var myarray=[25, 8, "George", "John"]
// myarray.sort(function(){ //Array elements now scrambled
//     return 0.5 - Math.random()
// })

function setStatusClass(button) {
  if (button.dataset.correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }
  button.disabled = true; //esto desabilita todos los botones al seleccionar uno
}

//FIXME: score funcion prueba. quitar la funcion que tengo dentro del event listener dentro del showQuestion para llamar la funcion  score dentro del event listener

// function scoreUser() {
//  if (button.dataset.correct === "true") {
//   score++;
//   console.log(score);
// }
// }

//FIXME: al clicar deberian de cambiar de color a un gris claro las respuests no seleccionadas, que se vea mas grande la seleccionada y dejar en verde la correcta, en rojo si se ha seleccionado la incorrecta

function selectAnswer() {
  Array.from(answerContainer.children).forEach((button) => {
    setStatusClass(button);
  });

  if (apiDataNew.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("d-none");
  } else {
    scorePageBtn.classList.remove("d-none");
  }
  // console.log(currentQuestionIndex)
}

// Función para decodificar HTML
function decodeHTML(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function showQuestion(currentQuestion) {
  const decodedQuestion = decodeHTML(currentQuestion.question); // Decodificar la pregunta
  questionElement.innerText = `${currentQuestionIndex + 1}. ${decodedQuestion}`;
  answerContainer.classList.add("justify-content-center");
  currentQuestion.allAnswers.forEach((answer) => {
    const decodedAnswer = decodeHTML(answer.text); // Decodificar la respuesta
    const button = document.createElement("button");
    button.classList.add("btn-answers");
    button.innerText = decodedAnswer;
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", () => {
      if (button.dataset.correct === "true") {
        score++;
        console.log(score);
      }
      selectAnswer();
    });
    answerContainer.appendChild(button);
  });
}

console.log(score);

// elimina las respuestas del contenedor para pintar las siguientes.
function resetState() {
  nextButton.classList.add("d-none");
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

function setNextQuestion() {
  resetState();
  showQuestion(apiDataNew[currentQuestionIndex]);
}

//Esta funcion esta conectada al boton start del quiz. Esconde el boton start al clicar y muestra el contenedor con la primera pregunta:
function startGame() {
  startButton.classList.add("d-none");
  currentQuestionIndex = 0;
  questionContainer.classList.remove("d-none");
  score = 0;
  setNextQuestion();
}

function restart() {
  homePage.classList.remove("d-none");
  scorePage.classList.add("d-none");
}

//EVENT LISTENER
btnTakeQuiz.addEventListener("click", () => {
  homePage.classList.add("d-none");
  scorePageBtn.classList.add("d-none");
  startButton.classList.remove("d-none");
  questionPage.classList.remove("d-none");
  questionContainer.classList.add("d-none");
  startGame();
});

nextButton.addEventListener("click", () => {
  questionElement.classList.remove("d-none");
  currentQuestionIndex++;
  setNextQuestion();
});

scorePageBtn.addEventListener("click", () => {
  // homePage.classList.add("d-none");
  questionPage.classList.add("d-none");
  scorePage.classList.remove("d-none");
  scoreText.innerText = `Your score is`;
  scoreNumber.innerText = `${score}/10`;
});

restartBtn.addEventListener("click", restart);
