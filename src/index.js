import getQuiz from './quizRequest.js'
import QuizGame from './quizObj.js'
import setQueryString from './setQueryString.js'
import renderQuiz from './renderQuiz.js'

let newQuiz
let quizURL = 'https://opentdb.com/api.php?amount=10'
const quizContainer = document.querySelector('#quiz')

document.querySelector('#selectionFields').addEventListener('change', (e) => {
    quizURL = `https://opentdb.com/api.php?${setQueryString(e, quizURL)}`
})

const startQuiz = async () => {
    const quiz = await getQuiz(quizURL)
    if (quiz.response_code === 1) {
        quizContainer.innerHTML =
            'Unfortunately we could not find any quiz matching your criteria. Please select different option from drop down menu'
        return
    } else {
        newQuiz = new QuizGame(quiz.results)
        newQuiz.createPossibleAnswersArr()
        renderQuiz(newQuiz)
        console.log(newQuiz)
    }
}

document.querySelector('#newQuiz').addEventListener('click', async (e) => {
    quizContainer.innerHTML = ''
    const loader = document.querySelector('#loader')
    e.target.disabled = true
    loader.className = 'spinner'
    await startQuiz()
    e.target.disabled = false
    loader.className = ''
})

