const getCorrectAnswers = (quiz) => {
    const quizContainer = document.querySelector('.finishedQuizContainer')
    quiz.forEach((quizItem, index) => {
        const questionText = document.createElement('p')
        questionText.innerHTML = `${index + 1}. ${quizItem.question}`
        quizContainer.append(questionText)
        quizItem.possibleAnswers.forEach((option) => {
            const answersItem = document.createElement('p')
            answersItem.innerHTML = option.name
            answersItem.className = 'box-styles'
            answersItem.style.marginLeft = '20px'
            quizContainer.append(answersItem)

            if (
                option.isChecked &&
                option.name === quiz[index].correct_answer
            ) {
                answersItem.style.backgroundColor = 'green'
                return
            }
            if (
                option.isChecked &&
                option.name !== quiz[index].correct_answer
            ) {
                answersItem.classList.add('wrong-answer')
            }
            if (
                (!option.isChecked &&
                    option.name === quiz[index].correct_answer) ||
                option.name === quiz[index].correct_answer
            ) {
                answersItem.style.backgroundColor = 'lightgreen'
            }
        })
    })
}
export default getCorrectAnswers
