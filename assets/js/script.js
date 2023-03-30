var questionBox = document.querySelector("#question-box")

var score = 0
var questionCounter = 0

var quizTimer = document.querySelector("#timer")
var quizBox = document.querySelector(".main-quiz-box")
var startButton = document.querySelector("#start-button")
var instructionsP = document.querySelector(".instruction-p")

var timeLeft = 30

var questions = [
  {
    question: 'What is the primitive type for the following value, "Hello"?',
    options: ["String", "Number", "Boolean", "Null",],
    answer: "String",
  },
  {
    question: "Where do we put the <script> element for JavaScript in the HTML?",
    options: ["<head>", "<body>", "<footer>", "<div>"],
    answer: "<body>",
  },
  {
    question: "Which window popup allows you to type in an answer?",
    options: ["alert","confirm", "prompt", "popup",],
    answer: "prompt",
  },
  {
    question: "Local Scope variables allows access to everything outside the block code.",
    options: ["True", "False",],
    answer: "False",
  },
  {
    question: "What is JavaScript?",
    options: ["A programming language that's a markup language.", "A programming language used to style the website.", "A programming language used to make websites more interactive.", "A programming language used to replace HTML and CSS.",],
    answer: "A programming language used to make websites more interactive.",
  }
]

function quizQuestions() {

  startButton.style.display = "none"
  instructionsP.textContent = ""

  var currentQuestion = questions[questionCounter]
  questionBox.textContent = currentQuestion.question
  
  document.querySelector(".all-options").innerHTML = ""
  
  currentQuestion.options.forEach(function(option){
    var button = document.createElement("button")
    button.textContent = option
    button.setAttribute("value", option)
    button.addEventListener("click", function(event){
      console.log(event.target.value)
      if(event.target.value === currentQuestion.answer){
        console.log('correct answer')
        score++
        console.log('score', score)
      }else {
        console.log('incorrect answer')
        timeLeft-= 10
      }
      
      questionCounter++

      if(questionCounter < questions.length){
        quizQuestions()
      }else {
        displayScore()
      }
    })
  document.querySelector(".all-options").appendChild(button)
  })
}

var playerNameForm = document.createElement("form")
var playerNameLabel = document.createElement("label")
var playerNameInput = document.createElement("Input")
var submitNameBtn = document.createElement("button")

function displayScore() {
  questionBox.textContent = "All done!"
  document.querySelector(".all-options").style.display = ""

  instructionsP.textContent = "Final Score: " + score +"/5"
  localStorage.setItem("Score", score)

  document.querySelector("#player-name").innerHTML = ""
  document.querySelector("#player-name").appendChild(playerNameForm)

  document.querySelector("form").appendChild(playerNameLabel)
  playerNameLabel.textContent = "Enter Player Name: "

  document.querySelector("form").appendChild(playerNameInput)

  document.querySelector("form").appendChild(submitNameBtn)

  submitNameBtn.textContent = "Submit"
}

submitNameBtn.addEventListener("click", function(event){
  event.preventDefault();

  var playerNameInputLS = playerNameInput.value
  
  if (playerNameInputLS === playerNameInput.value){
    localStorage.setItem("playerName", playerNameInputLS)
  }

  
})

function startTimer() {
  var timerInterval = setInterval(function() {
    timeLeft--;
    if(timeLeft < 0) {
      timeLeft = 0
    }
    quizTimer.textContent = "Timer: " + timeLeft;
    if(timeLeft <= 5) {
      quizTimer.setAttribute("style", "color: red; font-size: 18px")
    }
    if (timeLeft === 0) {
      clearInterval (timerInterval);
      displayScore()
    }
  }, 1000)
}

startButton.addEventListener("click", function(){
  startTimer()
  quizQuestions()
})

//setItem to put the high score in
//put in as an array of objects
//getItem to get it out