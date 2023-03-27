var quizTimer = document.querySelector("#timer")
var quizBox = document.querySelector(".main-quiz-box")
var questionBox = document.querySelector("#question-box")
var questionChoices = document.querySelector(".instructions")
var startButton = document.querySelector(".start-button")
var instructionsLi = document.querySelector(".instructions-li")

var timeLeft = 10

var optionALi = document.querySelector("#optionA")
var optionBLi = document.querySelector("#optionB")
var optionCLi = document.querySelector("#optionC")
var optionDLi = document.querySelector("#optionD")

var optionABtn = document.createElement("button")
var optionBBtn = document.createElement("button")
var optionCBtn = document.createElement("button")
var optionDBtn = document.createElement("button")


function Question1 (event) {
  event.preventDefault(); 

  startButton.style.display = "none"

  questionBox.textContent = "1. What primitive type is for the following value, 'Hello'."
  instructionsLi.textContent = ""
  optionABtn.textContent = "a. String"
  optionBBtn.textContent = "b. Number"
  optionCBtn.textContent = "c. Boolean"
  optionDBtn.textContent = "d. Null"

  optionALi.appendChild(optionABtn)
  optionBLi.appendChild(optionBBtn)
  optionCLi.appendChild(optionCBtn)
  optionDLi.appendChild(optionDBtn)

  var allOptionsBtn = [optionABtn, optionBBtn, optionCBtn, optionDBtn]
  for (var i = 0; i < allOptionsBtn.length; i++) {
    allOptionsBtn[i].setAttribute("style", "font-size: 20px; margin: 10px; width: 400px")
  }

  questionBox.setAttribute("style", "padding-left: 20px; padding-right: 20px")


  startTimer()
}


function showCorrectResult (event) {
  event.preventDefault()

}

function startTimer() {
  var timerInterval = setInterval(function() {
    timeLeft--;
    quizTimer.textContent = "Timer: " + timeLeft;
    if(timeLeft <= 5) {
      quizTimer.setAttribute("style", "color: red; font-size: 18px")
    }
    if (timeLeft === 0) {
      clearInterval (timerInterval);
    }
  }, 1000)
}


startButton.addEventListener("click", Question1)