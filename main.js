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

//FUNCIONES

//Esta funcion esta conectada al boton start del quiz. Escondel el boton start al clicar y muestra el contenedor con la primera pregunta:

// let currentQuestionIndex;

// function startGame() {
//   startButton.classList.add("hide");
//   currentQuestionIndex = 0;
//   questionContainer.classList.remove("hide");

//   showQuestion();
// }

//---------------------------------------------------
//Solo para comprobar el dato que nos llega de la Api:

// axios
//   .get("https://opentdb.com/api.php?amount=10")
//   .then((res) => console.log(res.data.results))
//   .catch((err) => console.error(err));

// metemos la info de la Api en una variable


axios
  .get("https://opentdb.com/api.php?amount=10")
  .then((res) => (apiData = res.data.results))
  .catch((err) => console.error(err));

setTimeout(() => {
  console.log(apiData);
}, "1000");

//---------------------------------
//FIXME:   modificar para que me recoja la question de la API.
//la estructura de question-answer es diferente del ejercicio de clase en la API
//(result es un array de objetos con cada question, map/forEach?)
//En la API question y answers estan enb el mismo objeto pero la respuesta correcta y las incorrectas por separado
// Quitar el SETTIMEOUT cuando reorganice el codigo y no lo necesite

// lo siguientes es codigo para probar a traerme las respuestas pero la estructura es diferente. Pensar una manera de como mostrarlas en el DOM y despues anadirlo a la funcion ShowQuestions o enlazarlo al boton start, por lo menos la primera:

function getQuestions(){
    apiData = apiData.map((elemento) => ({
      question: elemento.question,
      correctAnswer: elemento.correct_answer,
      allAnswers: [...elemento.incorrect_answers, elemento.correct_answer]
    
    }))
  
    console.log(allAnswers)
 
  }





getQuestions()

// function getQuestions() {
//   axios
//       .get("https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple")
//       .then((response) => {
//            
//           console.log("Las preguntas formateadas son:", quizz);
//           startButton.addEventListener("click", () => {
//               resetGame();
//               startGame(quizz);
//           });
//       })
//       .catch((err) => {
//           console.error("Error", err);
//       });
// }
// let answers = [];


// function showAnswers() {
//   setTimeout(() => {
//     apiData.forEach((element) => {
      
//       answers.push(element.correct_answer);

//       element.incorrect_answers.forEach((element) => {
//         answers.push(element);
//       });

//       //CORRECT answers
//       const button = document.createElement("button");
//       button.innerText = element.correct_answer;
//       answerContainer.appendChild(button);

//       //FIXME:esto no se si funciona
//       button.dataset.correct = true;
//       // console.log(element.correct_answer)

//       //INCORRECT answers
//       element.incorrect_answers.forEach((element) => {
          
//       const buttonI = document.createElement("button");
//       buttonI.innerText = element;
//       answerContainer.appendChild(buttonI);

//       // console.log(element)

//       });
      
    
      
//     });
//   }, "1000");
// }


// console.log(answers);



 //FIXME:esto no se si funciona, no lo pinta de verde

// function setStatusClass(element) {
//   if (element.dataset.correct) {
//   element.classList.add("correct");
//   } else {
//   element.classList.add("wrong");  
//   }}  


//--------------------------------------------------

// function showQuestion() {
//   setTimeout(() => {
//     apiData.forEach((element) => {
//       questionElement.innerText = element.question;
//     });
//   }, "1000");

//   showAnswers();
// }




//EVENT LISTENER
// startButton.addEventListener("click", startGame);

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
