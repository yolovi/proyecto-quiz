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

//TODO: add sort and math random a los botones para que no salga siempre la true en la misma posicion   
//TODO: add decodeURI para los simbolos raros de las preguntas
//TODO: add marcador socore

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



// var myarray=[25, 8, "George", "John"] 
// myarray.sort(function(){ //Array elements now scrambled
//     return 0.5 - Math.random()
// })


function setStatusClass(btn) {
    if (btn.dataset.correct) {
      btn.classList.add("correct");
    } else {
      btn.classList.add("wrong");
    }
  }
  

function selectAnswer() {
    Array.from(answerContainer.children).forEach((button) => {
      setStatusClass(button);
    });
  
    if (apiDataNew.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
      startButton.innerText = "Restart";
      startButton.classList.remove("hide");
    }
    console.log(currentQuestionIndex)
  }

function showQuestion(currentQuestion) {
  questionElement.innerText = currentQuestion.question;
  currentQuestion.allAnswers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = true;
    }

    button.addEventListener("click", selectAnswer);
    answerContainer.appendChild(button);
  });
}

// elimina las respuestas del contenedor para pintar las siguientes.
function resetState() {
  nextButton.classList.add("hide");
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

function setNextQuestion() {
    resetState()
  showQuestion(apiDataNew[currentQuestionIndex]);
}

//Esta funcion esta conectada al boton start del quiz. Esconde el boton start al clicar y muestra el contenedor con la primera pregunta:

let currentQuestionIndex;


function startGame() {
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    questionContainer.classList.remove("hide");
  
    setNextQuestion();
  }
  

//EVENT LISTENER
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
