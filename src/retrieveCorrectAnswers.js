const retrieveCorrectAnswers = (answers) => {
    const correctAnswers = answers.filter((answer) => answer.isCorrect)
    return correctAnswers
}

export default retrieveCorrectAnswers
