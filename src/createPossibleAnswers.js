const createPossibleAnswersArr = (quiz) => {
    quiz.forEach((quizObj) => {
        quizObj.possibleAnswers = []
        const possibleAnswersArr = [...quizObj.incorrect_answers]
        const index = Math.floor(
            Math.random() * (possibleAnswersArr.length + 1)
        )
        possibleAnswersArr.splice(index, 0, quizObj.correct_answer)
        possibleAnswersArr.forEach((answer) => {
            quizObj.possibleAnswers.push({ name: answer, isChecked: false })
            
            if (quizObj.possibleAnswers.length < 3) {
                if (quizObj.possibleAnswers[0].name === 'False') {
                    quizObj.possibleAnswers.reverse()
                }
            }
        })
    })
}

export default createPossibleAnswersArr
