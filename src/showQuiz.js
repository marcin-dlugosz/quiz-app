import getQuiz from './quizRequest.js'
import createPossibleAnswersArr from './createPossibleAnswers.js'
import renderQuiz from './renderQuiz.js'

let quiz
let answers = []
const quizContainer = document.querySelector('#quizContainer')

const startQuiz = async (quizOptionsURL) => {
    const data = await getQuiz(quizOptionsURL)
    if (data.response_code === 1) {
        quizContainer.innerHTML =
            'Unfortunately we could not find any quiz matching your criteria. Please select different option from drop down menu'
        return
    } else {
        quiz = data.results
        createPossibleAnswersArr(quiz)
        renderQuiz(quiz, answers)

        console.log(quiz)
    }
}

const showQuiz = async (e, quizOptionsURL) => {
    const loader = document.querySelector('#loader')
    const number = document.querySelector('input[type="number"]')
    let timeLimit = 0
    if (number.value > 20 && number.value < 40) {
        timeLimit += 5000
        setTimeout(() => {
            console.log(timeLimit / 1000 + ' ' + 'sec' + ' ' + 'has passed')
        }, timeLimit)
    }
    if (number.value >= 40) {
        timeLimit += 10000
        setTimeout(() => {
            console.log(timeLimit + ' ' + 'has passed')
        }, timeLimit)
    }
    e.target.disabled = true
    loader.className = 'loader'
    await startQuiz(quizOptionsURL).catch((err) => {
        const errorElem = document.createElement('p')
        err.message = 'Unable to fetch quiz'
        errorElem.textContent = err.message
        quizContainer.append(errorElem)
    })
    loader.className = ''
    e.target.disabled = false
}

export default showQuiz
