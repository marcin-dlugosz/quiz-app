import addAnswers from './addAnswers.js'

const getPossibleAnswers = (quiz, index, answers, list) => {
    const possibleAnsArray = quiz[index].possibleAnswers

    // Generate possible answers DOM
    possibleAnsArray.forEach(({ name }) => {
        const listItem = document.createElement('li')
        const input = document.createElement('input')
        const label = document.createElement('label')
        label.setAttribute('for', name)
        label.innerHTML = name
        input.type = 'radio'
        input.name = 'possibleAnswers'
        input.id = name
        input.value = name
        listItem.append(input, label)
        list.append(listItem)

        // Radio button event for possible answers
        input.addEventListener('change', (e) => {
            addAnswers(e, quiz, index, answers)
            const answerLabels = Array.from(
                document.querySelectorAll('li label')
            )

            answerLabels.forEach((label) => {
                // highlight an answer text when specific answer is checked
                if (e.target.value === label.htmlFor) {
                    label.className = 'highlight'
                } else {
                    label.className = ''
                }
            })
            possibleAnsArray.forEach((answer) => {
                // reset isChecked property of a checked answer to false when other answer is checked
                if (answer.isChecked) {
                    answer.isChecked = false
                }
                if (e.target.value === answer.name) {
                    answer.isChecked = e.target.checked
                }
            })
        })
        // Keep an answer checked and highlighted when moving between questions
        const checkedAnswer = possibleAnsArray.find(
            (ansObj) => ansObj.isChecked
        )
        if (!checkedAnswer) {
            return
        } else if (input.value === checkedAnswer.name) {
            const radioButtons = Array.from(
                document.querySelectorAll('input[type=radio')
            )
            const selectedBtn = radioButtons.find((item) => {
                return item.defaultValue === checkedAnswer.name
            })
            const answerLabels = Array.from(
                document.querySelectorAll('li label')
            )
            const selectedAnswer = answerLabels.find((label) => {
                return checkedAnswer.name === label.htmlFor
            })
            selectedAnswer.setAttribute('class', 'highlight')
            selectedBtn.setAttribute('checked', 'checked')
        }
    })
}

export default getPossibleAnswers
