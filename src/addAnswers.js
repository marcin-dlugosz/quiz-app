const addAnswers = (e, quiz, index, answers) => {
    const selectedAnswer = e.target.value
    if (selectedAnswer === quiz[index].correct_answer) {
        answers[index] = { name: selectedAnswer, isCorrect: true }
    } else {
        answers[index] = { name: selectedAnswer, isCorrect: false }
    }
}

export default addAnswers