//Variables
var questionBox = document.querySelector("#question-box")
var quizTimer = document.querySelector("#timer")
var quizBox = document.querySelector(".main-quiz-box")
var startButton = document.querySelector("#start-button")
var instructionsP = document.querySelector(".instruction-p")
var viewHighScores = document.querySelector(".view-high-scores")

var score = 0
var questionCounter = 0
var timeLeft = 60

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

//Timer for the quiz. Starts at 60 seconds. Once time left is 5 seconds text will turn red and font size will increase to 18px. At 0 seconds the timer stops.
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

//Each question in the questions variable is displayed. A button is created for each option. When a button is clicked the score will increase by 1 if the selected button matches the currentQuestion.answer. If not, the time will decrease by 10 seconds then the next question will display. Once all the questions have been displayed the displayScore function will run.
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

//New elements are created when the displayScore function runs to show the user that it's the end of the quiz. The final score is displayed with an input area to enter their name. When submitting name, the player name and score will display on page. Each player name and score item will be put into a string and then a JavaScript object by JSON.stringify and JSON.parse. Player name and score items will setItem to local storage and getItem to display to webpage. Player has option to play again or view high scores.
function displayScore() {
  var playerNameForm = document.createElement("form")
  var playerNameLabel = document.createElement("label")
  var playerNameInput = document.createElement("Input")
  var submitNameBtn = document.createElement("button")

  questionBox.textContent = "All done!"
  submitNameBtn.textContent = "Submit"
  playerNameLabel.textContent = "Enter Player Name: "
  instructionsP.textContent = "Final Score: " + score +"/5"

  document.querySelector("#player-name").innerHTML = ""
  document.querySelector("#player-name").appendChild(playerNameForm)
  document.querySelector("form").appendChild(playerNameLabel)
  document.querySelector("form").appendChild(playerNameInput)
  document.querySelector("form").appendChild(submitNameBtn)

  submitNameBtn.addEventListener("click", function(event){
    event.preventDefault();

    var playerName = document.querySelector("input").value
    var playerObject = {playerName, score}
    var storedNames = JSON.parse(localStorage.getItem("playerName")) || []
    storedNames.push(playerObject)
    localStorage.setItem("playerName", JSON.stringify(storedNames))

    var nameAndScore = document.createElement("div")
    nameAndScore.textContent = playerName + " " + score
    document.querySelector(".all-options").appendChild(nameAndScore)
  })
  var playAgainBtn = document.createElement("button")
  playAgainBtn.setAttribute("class", "playAgainBtn")
  playAgainBtn.textContent = "Play Again"
  playAgainBtn.onclick= function(){
    window.location.reload()
  }
  document.querySelector(".all-options").appendChild(playAgainBtn)
}

//The highScorePage function is used to show all the player names and their scores that have completed the quiz. These names and scores were pulled from local storage using a for loop that creates an "li" element to display the player's name and score.
function highScorePage(){
  questionBox.textContent = "High Scores"
  instructionsP.textContent = ""
  document.querySelector(".all-options").innerHTML = ""
  startButton.style.display = "none"

  var storedNames = JSON.parse(localStorage.getItem("playerName")) || []

  var ul = document.createElement("ul")
  var highScoreList = document.querySelector(".instructions")
  
  for (var i = 0; i < storedNames.length; i++) {
    var player = storedNames[i]
    var li = document.createElement("li")
    li.textContent = player.playerName + " " + player.score
    ul.appendChild(li)
  }

  highScoreList.appendChild(ul)

  //The "Go Back" button allows users to go back to the quiz question secions.
  var goBackBtn = document.createElement("button")
  goBackBtn.textContent="Go Back"
  goBackBtn.onclick= function(){
    window.location.reload()
  }
  highScoreList.appendChild(goBackBtn)
}

//The startQuiz button and viewHighScores button uses a for loop so the user can trigger which ever function they desire.
var startQuizBtn = document.querySelector(".start")
var buttons = document.querySelectorAll("button")

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function(){
    console.log(this.innerText + " was clicked")
    if(this === startQuizBtn) {
      startTimer()
      quizQuestions()
    }else if (this === viewHighScores) {
      highScorePage()
    }
  })
}