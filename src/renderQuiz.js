import getPossibleAnswers from './getPossibleAnswers.js'
import createQuizSummary from './quizResult.js'

import showCorrectAnswers from './showCorrectAnswers.js'
import { createQuizTimer, timeout, interval } from './timerFunctions.js'

const renderQuiz = (quiz, answers) => {
    let index = 0
    let questionCounter = 1

    const quizLength = quiz.length
    const startedAt = Date.now()

    // Generate quiz DOM
    const quizContainer = document.querySelector('#quizContainer')
    const questionText = document.createElement('p')
    const answersList = document.createElement('ol')

    const nextQuestionBtn = document.createElement('button')
    nextQuestionBtn.textContent = 'Next'
    const prevQuestionBtn = document.createElement('button')
    prevQuestionBtn.style.display = 'none'
    prevQuestionBtn.textContent = 'Previous Question'
    questionText.innerHTML = `${questionCounter}. ${quiz[index].question}`
    getPossibleAnswers(quiz, index, answers, answersList)

    nextQuestionBtn.addEventListener('click', () => {
        prevQuestionBtn.style.display = 'inline-block'

        if (index === quizLength - 2) {
            // Changing the button's name when last question shown
            nextQuestionBtn.textContent = 'Finish & go to score'
        }
        if (index < quizLength - 1) {
            if (!answers[index]) {
                // if no answer checked, set isCorrect property to false
                answers[index] = { name: '', isCorrect: false }
            }
            answersList.innerHTML = ''
            index++
            questionCounter++
            questionText.innerHTML = `${questionCounter}. ${quiz[index].question}`
            getPossibleAnswers(quiz, index, answers, answersList)
        } else {
            clearInterval(interval) // Stopping timer when quiz finished
            clearTimeout(timeout) // Preventing timeout message from showing when quiz finished

            createQuizSummary(quizLength, answers, startedAt)
            showCorrectAnswers(quizContainer, quiz)
        }
    })
    prevQuestionBtn.addEventListener('click', () => {
        if (index <= quizLength - 1) {
            answersList.innerHTML = ''
            index--
            questionCounter--
            questionText.innerHTML = `${questionCounter}. ${quiz[index].question}`
            getPossibleAnswers(quiz, index, answers, answersList)
        }
        if (index !== quizLength - 1) {
            nextQuestionBtn.textContent = 'Next Question'
        }
        if (index === 0) {
            prevQuestionBtn.style.display = 'none'
        }
    })
    quizContainer.append(
        questionText,
        answersList,
        prevQuestionBtn,
        nextQuestionBtn
    )
    createQuizTimer(quizContainer)
}

export default renderQuiz
