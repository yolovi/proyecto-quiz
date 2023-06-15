//El Quiz constará de 10 preguntas. Cada pregunta tendrá 4 opciones y sólo una de ellas será la correcta.
// Deberán ser preguntas que vengan de https://opentdb.com/ o otras API’s que busqueis.Utiliza AXIOS
// La aplicación tendrá que ser una SPA (single-page application). Sólo una pregunta cada vez en pantalla.

//API QUIZ - AXIOS: https://opentdb.com/api.php?amount=10

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

//---------------------------------------------------
//Solo para comprobar el dato que nos llega de la Api: 

axios
  .get("https://opentdb.com/api.php?amount=10")
  .then((res) => console.log(res.data.results))
  .catch((err) => console.error(err));

//---------------------------------
//FIXME:   modificar para que me recoja la question de la API.
//la estructura de question-answer es diferente del ejercicio de clase en la API 
//(result es un array de objetos con cada question, map/forEach?)
//En la API question y answers estan enb el mismo objeto pero la respuesta correcta y las incorrectas por separado

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    if (answer.correct) {
      button.dataset.correct = true;
    }
    answerButtonsElement.appendChild(button);
  });
}

//EVENT LISTENER
startButton.addEventListener("click", startGame);

//TODO: BORRAR AL TERMINAR

//EJEMPLO ESTRUCTURA QUESTIONS JS con 2 preguntas:
/* const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "4", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Is web development fun?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "YES!!!", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
]; */

// vs ESTRUCTURA API:
/* const api = {
    "response_code": 0,
    //desde aqui es un array con objetos:
    
    "results": [ 
      { 
        "category": "Science & Nature",
        "type": "multiple",
        "difficulty": "medium",
        "question": "Au on the Periodic Table refers to which element?",
        "correct_answer": "Gold",
        "incorrect_answers": [
          "Silver",
          "Oxygen",
          "Nickel"
        ]
      },
      {
        "category": "Entertainment: Music",
        "type": "multiple",
        "difficulty": "medium",
        "question": "What is the name of French electronic music producer Madeon&#039;s 2015 debut studio album?",
        "correct_answer": "Adventure",
        "incorrect_answers": [
          "The City",
          "Icarus",
          "Pop Culture"
        ]
      },
    ]
  }

  console.log(typeof api) */
