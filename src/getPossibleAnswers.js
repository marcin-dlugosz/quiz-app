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
                answer.marked = false
            })
            quizObj.setCorrectAns(e, index)

            const answerObj = possibleAnsArray.find((ans) => {
                return e.target.value === ans.name
            })
            if (answerObj) {
                answerObj.marked = e.target.checked
            }
        })

        const markedAns = possibleAnsArray.find((ansObj) => ansObj.marked)
        if (!markedAns) {
            return
        } else if (input.value === markedAns.name) {
            const list = Array.from(
                document.querySelectorAll('input[type=radio')
            )
            const checkedAns = list.find((item) => {
                return item.defaultValue === markedAns.name
            })
            checkedAns.setAttribute('checked', 'checked')
        }
    })
}
export default getPossibleAnswers
