const getPossibleAnswers = (quizObj, index, list) => {
    const possibleAnsArray = quizObj.quiz[index].possibleAnswers

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
            possibleAnsArray.forEach((answer) => {
                answer.isChecked = false
            })
            quizObj.addAnswers(e, index)
            console.log(quizObj.answers)

            const answerObj = possibleAnsArray.find((ans) => {
                return e.target.value === ans.name
            })
            if (answerObj) {
                answerObj.isChecked = e.target.checked
            }
        })

        const checkedAns = possibleAnsArray.find((ansObj) => ansObj.isChecked)
        if (!checkedAns) {
            return
        } else if (input.value === checkedAns.name) {
            const list = Array.from(
                document.querySelectorAll('input[type=radio')
            )
            const checkedAnswer = list.find((item) => {
                return item.defaultValue === checkedAns.name
            })
            checkedAnswer.setAttribute('checked', 'checked')
        }
    })
}
export default getPossibleAnswers
