import getQuiz from './quizRequest.js'
import createPossibleAnswersArr from './createPossibleAnswers.js'
import renderQuiz from './renderQuiz.js'

let quiz
let answers = []
const quizContainer = document.querySelector('#quizContainer')

const createQuizArray = async (quizOptionsURL) => {
  const quizData = await getQuiz(quizOptionsURL)
  if (!quizData) {
    return
  }
  if (quizData.response_code === 1) {
      quizContainer.innerHTML = ''
        quizContainer.innerHTML =
            'Unfortunately we could not find any quiz matching your criteria. Please select different option from drop down menu'
        return
    } else {
        quiz = quizData.results
        createPossibleAnswersArr(quiz)

        console.log(quiz)
    }
}
const showQuiz = async (e, quizOptionsURL) => {
    const loader = document.querySelector('#loader')
    e.target.disabled = true
    loader.className = 'loader'
    await createQuizArray(quizOptionsURL)
    loader.className = ''
    e.target.disabled = false
    if (!quiz) {
        return
    }
    renderQuiz(quiz, answers)
}
export default showQuiz
