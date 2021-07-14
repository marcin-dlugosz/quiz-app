import retrieveCorrectAnswers from './retrieveCorrectAnswers.js'
import calculateDuration from './calculateDuration.js'


const createQuizSummary = (quizLength, answers, startedAt) => {
    const correctAnswers = retrieveCorrectAnswers(answers)
    const correctAnswersLength = correctAnswers.length
   
    const quizContainer = document.querySelector('#quizContainer')
    quizContainer.innerHTML = `<p>Your result: ${correctAnswersLength} correct answers out of ${quizLength}</p>
            <p>Time it took: ${calculateDuration(startedAt)}</p>
            <p>${calculateResult(correctAnswersLength, quizLength)}</p>`
}

const calculateResult = (correctAnswersLength, quizLength) => {
    let resultText = ''
    const percentageOfCorrectAnswers = (correctAnswersLength / quizLength) * 100
    if (percentageOfCorrectAnswers < 50) {
        resultText = 'Sorry but you answered less than 50% of questions'
    } else if (
        percentageOfCorrectAnswers >= 50 &&
        percentageOfCorrectAnswers < 100
    ) {
        resultText = 'Good job! You answered more than 50% of questions'
    } else {
        resultText = 'Well done! You scored 10 points'
    }
    return resultText
}
export default createQuizSummary
