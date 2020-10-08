import getQuiz from './quizRequest.js'
import QuizGame from './quizObj.js'
import modifyURL from './modifyURL.js'
import renderQuiz from './renderQuiz.js'

let newQuiz
let quizOptionsURL = 'https://opentdb.com/api.php?amount=10'
const quizContainer = document.querySelector('#quiz')

document.querySelector('#selectFieldsWrapper').addEventListener('change', (e) => {
    quizOptionsURL = `https://opentdb.com/api.php?${modifyURL(e, quizOptionsURL)}`
})

const startQuiz = async () => {
    const quiz = await getQuiz(quizOptionsURL)
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

