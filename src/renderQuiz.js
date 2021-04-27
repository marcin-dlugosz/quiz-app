import getPossibleAnswers from './getPossibleAnswers.js'
import calculateDuration from './calculateDuration.js'
import retrieveCorrectAnswers from './retrieveCorrectAnswers.js'
import showCorrectAnswers from './showCorrectAnswers.js'
import createQuizTimer from './timerFunctions.js'

const renderQuiz = (quiz, answers) => {
    let index = 0
    let questionCounter = 1

    const quizStartedAt = Date.now()
    const quizLength = quiz.length

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
            const correctAnswers = retrieveCorrectAnswers(answers)
            const correctAnswersLength = correctAnswers.length
            quizContainer.innerHTML = `<p>Your result: ${correctAnswersLength} correct answers out of ${quizLength}</p>
            <p>Time it took: ${calculateDuration(quizStartedAt)}</p>`
            if (correctAnswersLength <= 5) {
                quizContainer.innerHTML =
                    "Sorry but you didn't answer enough questions"
            } else if (correctAnswersLength > 5 && correctAnswersLength < 10) {
                quizContainer.innerHTML = 'Good job! You scored 5 points'
            } else {
                quizContainer.innerHTML = 'Well done! You scored 10 points'
            }
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
