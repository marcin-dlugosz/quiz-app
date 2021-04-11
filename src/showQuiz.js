import getQuiz from './quizRequest.js'
import createPossibleAnswersArr from './createPossibleAnswers.js'
import renderQuiz from './renderQuiz.js'

let quiz
let answers = []

const startQuiz = async () => {
    const data = await getQuiz(quizOptionsURL)
    if (data.response_code === 1) {
        document.querySelector('#quizContainer').innerHTML =
            'Unfortunately we could not find any quiz matching your criteria. Please select different option from drop down menu'
        return
    } else {
        quiz = data.results
        createPossibleAnswersArr(quiz)
        renderQuiz(quiz, answers)

        console.log(quiz)
    }
}

const showQuiz = async (e) => {
    document.querySelector('#quizContainer').innerHTML = ''
    document.querySelector('.finishedQuizContainer').innerHTML = ''
    const number = document.querySelector('input[type="number')
    try {
        if (number.value < 10 || number.value > 50) {
            throw 'Please enter a number between 10 and 50'
        }
        const loader = document.querySelector('#loader')
        e.target.disabled = true
        loader.className = 'loader'
        await startQuiz()
        e.target.disabled = false
        loader.className = ''
    } catch (err) {
        const errorText = document.createElement('p')
        errorText.textContent = err
        quizContainer.append(errorText)
    }
}

export default showQuiz