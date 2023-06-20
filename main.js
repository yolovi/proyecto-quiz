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
const restartBtn = document.getElementById("restart-btn")

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

setTimeout(() => {
  console.log(apiData);
}, "1000");

//FUNCIONES

//TODO: add decodeURI para los simbolos raros de las preguntas
//TODO: en el div score crear un boton para pintar la puntuacion al final del quizz con la ultima pregunta
//TODO: poner el boton de "restart" en el div de score. Y que cuando se seleccione la ultima pregunta te lleve automaticamente al div-pag score o tambien se podria poner un boton "ver mis resultados" que haga lo mismo (llevarte al div score y ponerte el boton restart)
//FIXME: poner el contador a 0 cuando vuelve a comenzar la partida. 
//TODO: Guardar en el Local Storage cada puntuacion


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

//FIXME: cambiar starButton.innerText= "Restart" y poner "show Your Score" que te dirija  a la pagina Score y ahi poner el boton restar/play again

function selectAnswer() {
  Array.from(answerContainer.children).forEach((button) => {
    setStatusClass(button);
  });

  if (apiDataNew.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    // startButton.innerText = "Restart";
    scorePageBtn.classList.remove("hide");
    // startButton.classList.remove("hide");
  }
  // console.log(currentQuestionIndex)
}

function showQuestion(currentQuestion) {
  questionElement.innerText = `${currentQuestionIndex + 1}. ${
    currentQuestion.question
  }`;
  // console.log(questionNumber)
  // console.log(currentQuestionIndex)
  currentQuestion.allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
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
  nextButton.classList.add("hide");
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
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");

  setNextQuestion();
}

function restart() {
  // restartBtn.innerText = "Restart";
  homePage.classList.remove("hide")
  scorePage.classList.add("hide")
}


//EVENT LISTENER
btnTakeQuiz.addEventListener("click", () => {
  homePage.classList.add("hide");
  scorePageBtn.classList.add("hide");
  startButton.classList.remove("hide");
  questionPage.classList.remove("hide");
  questionContainer.classList.add("hide")
});
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  questionElement.classList.remove("hide");
  currentQuestionIndex++;
  setNextQuestion();
});

scorePageBtn.addEventListener("click", () => {
  // homePage.classList.add("hide");
  questionPage.classList.add("hide");
  scorePage.classList.remove("hide");
  scoreText.innerText = `Your score is ${score}`;
});
restartBtn.addEventListener("click", restart );
// scoreButton.addEventListener("click", showScore )
