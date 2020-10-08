import getPossibleAnswers from './getPossibleAnswers.js'
import calculateDuration from './calculateDuration.js'

const renderQuiz = (quizObj) => {
    let index = 0
    let questionCounter = 1
    const quizStartedAt = Date.now()
    const quizLength = quizObj.quiz.length
    
    // Generate quiz DOM
    const quizContainer = document.querySelector('#quiz')
    const questionText = document.createElement('p')
    const answersList = document.createElement('ol')
    const questionCount = document.createElement('p')

    const nextQuestionBtn = document.createElement('button')
    nextQuestionBtn.textContent = 'Next Question'

    const prevQuestionBtn = document.createElement('button')
    prevQuestionBtn.style.display = 'none'
    prevQuestionBtn.textContent = 'Previous Question'
    questionText.innerHTML = quizObj.quiz[index].question
    questionCount.textContent = `Question ${questionCounter}`
    getPossibleAnswers(quizObj, index, answersList)

    nextQuestionBtn.addEventListener('click', () => {
        quizObj.incrementCorrectAnsCounter()
        prevQuestionBtn.style.display = 'inline-block'
        if (index === quizLength - 2) {
            // Changing the button's name when last question shown
            nextQuestionBtn.textContent = 'Finish & go to score'
        }
        if (index < quizLength - 1) {
            answersList.innerHTML = ''
            index++
            questionCounter++
            questionCount.textContent = `Question ${questionCounter}`
            questionText.innerHTML = quizObj.quiz[index].question
            getPossibleAnswers(quizObj, index, answersList)
        } else {
            quizContainer.innerHTML = `<p>Your result: ${
                quizObj.correctAnswersCounter
            } correct answers out of ${quizLength}</p>
            <p>Time it took: ${calculateDuration(quizStartedAt)}</p>`
            quizObj.correctAnswersCounter = 0
        }
        console.log(quizObj.correctAnswersCounter);
        console.log(quizObj.correctAnswer);
    })

    prevQuestionBtn.addEventListener('click', () => {
        quizObj.incrementCorrectAnsCounter()
        if (index <= quizLength - 1) {
            answersList.innerHTML = ''
            index--
            questionCounter--
            questionCount.textContent = `Question ${questionCounter}`
            questionText.innerHTML = quizObj.quiz[index].question
            getPossibleAnswers(quizObj, index, answersList)
        }
        if (index !== quizLength - 1) {
            nextQuestionBtn.textContent = 'Next Question'
        }
        if (index === 0) {
            prevQuestionBtn.style.display = 'none'
        }
        console.log(quizObj.correctAnswersCounter);
        console.log(quizObj.correctAnswer);
    })
    quizContainer.append(
        questionText,
        answersList,
        prevQuestionBtn,
        nextQuestionBtn,
        questionCount
    )
}

export default renderQuiz
