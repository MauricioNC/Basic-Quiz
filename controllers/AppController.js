import { QuizController } from "./QuizController.js"

const btnStart = document.getElementById("start")
const quizContainer = document.querySelector(".quiz-container") 
const questionContainer = document.querySelector(".question") 
const optionsContiner = document.querySelector(".options") 

let indexQuestion = 0

const question = new QuizController()
const optionsList = new QuizController()

const score = new QuizController()

/* ============================================================================== */

/**
 * Start the quiz once button start is clicked 
 */

btnStart.addEventListener('click', () => {
  optionsContiner.innerHTML = ""
  
  showQuestion(indexQuestion)

  btnStart.style.display = 'none'
  quizContainer.classList.remove("d-none")
  // quizContainer.style.display = 'flex'
  
})

/* ============================================================================== */

/**
 * @param {number} indexQuestion 
 * @returns the actual question
 */
function showQuestion(indexQuestion)
{
  
  //Get the actual question and the respective options, passing the actual index as parameter
  const actualQuestion = question.getQuestion(indexQuestion)
  const options = optionsList.getOptions(indexQuestion)
  
  // if options's false, then call endQuiz() function, the return will break the function flow, otherwise, continue with the flow
  if(!options)
  {
    endQuiz()
    return
  }

  // Put the actual question inside of question container
  questionContainer.innerHTML = actualQuestion
  
  // Iterate the options response, by each option we creater a new button and make appendChild inside of options container
  options.forEach(element => {
    const btnOption = document.createElement("button")
    btnOption.className = 'btnOption'
    btnOption.className += ' btn'
    btnOption.innerHTML += element
    optionsContiner.appendChild(btnOption)
  })
  
  // Once called the showQuestion() function, after printed the question, it is called the validAnswer() and it is incrementd the indexQuestion
  validAnswer(indexQuestion)
}

/* ============================================================================== */

/**
 * @param {number} indexQuestion
 * 
 * Iterate each button option and listen for a click event, then we call the getScore() method and pass selectedOption and indexQuestion, after that, it's called the showQuestion() function with indexQuestion as parameter + 1, to get the next question
 */

function validAnswer(indexQuestion)
{
  for(let i = 0; i < optionsContiner.childNodes.length; i++)
  {
    optionsContiner.childNodes[i].addEventListener('click', () => {
      const selectedOption = optionsContiner.childNodes[i].textContent
      score.getScore(selectedOption, indexQuestion)
      optionsContiner.innerHTML = ""
      showQuestion(indexQuestion+1)
    })
  }
}

/* ============================================================================== */

function endQuiz()
{
  questionContainer.innerHTML = "Quiz ended"
  optionsContiner.innerHTML = `Your score is: ${score.getScore("", -1)}`

  btnStart.textContent = "Try again"
  btnStart.style.display = "block"
}