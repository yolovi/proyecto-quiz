//QUIZ SPA API AXIOS

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

// VARIABLES

let apiData = [];
let apiDataNew = [];
let currentQuestionIndex;
let score = 0;

// peticion datos API
axios
  .get("https://opentdb.com/api.php?amount=10")
  .then((res) => (apiData = res.data.results))
  .catch((err) => console.error(err));

//FUNCIONES

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
  }, 1000);
}

getQuestions();

function setStatusClass(button) {
  if (button.dataset.correct) {
    button.classList.add("correct");
  } else {
    button.classList.add("wrong");
  }
  button.disabled = true;
}

function selectAnswer() {
  Array.from(answerContainer.children).forEach((button) => {
    setStatusClass(button);
  });

  if (apiDataNew.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("d-none");
  } else {
    scorePageBtn.classList.remove("d-none");
  }
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
      }
      selectAnswer();
    });
    answerContainer.appendChild(button);
  });
}

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
  questionPage.classList.add("d-none");
  scorePage.classList.remove("d-none");
  scoreText.innerText = `Your score is`;
  scoreNumber.innerText = `${score}/10`;
});

restartBtn.addEventListener("click", restart);
