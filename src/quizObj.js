class QuizGame {
    constructor(quiz) {
        this.quiz = quiz
        this.answers = []
    }

    createPossibleAnswersArr() {
        this.quiz.forEach((obj) => {
            obj.possibleAnswers = []
            const possibleAnswersArr = [...obj.incorrect_answers]
            const index = Math.floor(Math.random() * (possibleAnswersArr.length + 1))

            possibleAnswersArr.splice(index, 0, obj.correct_answer)
            possibleAnswersArr.forEach((answer) => {
                obj.possibleAnswers.push({ name: answer, isChecked: false })
            })
        })
    }

    addAnswers(e, index) {
        const selectedAnswer = e.target.value
        if (selectedAnswer === this.quiz[index].correct_answer) {
            this.answers[index] = { name: selectedAnswer, isCorrect: true }
        } else {
            this.answers[index] = { name: selectedAnswer, isCorrect: false }
        }
    }

    retrieveCorrectAnswers() {
        const correctAnswers = this.answers.filter((answer) => answer.isCorrect)
        return correctAnswers
    }
}

export default QuizGame
