import modifyURL from './modifyURL.js'
import showQuiz from './showQuiz.js'
import { timeout, interval } from './timerFunctions.js'
import {showRangeError} from './errors.js'

let quizOptionsURL = 'https://opentdb.com/api.php?amount=10'
const quizContainer = document.querySelector('#quizContainer')
const numOfQuestions = document.querySelector('input[type="number"]')
const startQuizBtn = document.querySelector('#startQuizBtn')

document
    .querySelector('#selectFieldsWrapper')
    .addEventListener('change', (e) => {
        quizOptionsURL = `https://opentdb.com/api.php?${modifyURL(
            e,
            quizOptionsURL
        )}`
    })

numOfQuestions.addEventListener('input', showRangeError)

startQuizBtn.addEventListener('click', async (e) => {
    clearInterval(interval)
    clearTimeout(timeout)
    quizContainer.innerHTML = ''
    document.querySelector('.finishedQuizContainer').innerHTML = ''
    await showQuiz(e, quizOptionsURL)
})

// jquery functions
$('select.dropdown').dropdown()
