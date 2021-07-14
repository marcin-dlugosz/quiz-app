const showError = (err) => {
    const errorElem = document.createElement('p')
    err.message = 'Unable to fetch quiz'
    errorElem.textContent = err.message
    errorElem.className = 'fetchError'
    quizContainer.append(errorElem)
}
const showRangeError = () => {
    const inputField = document.querySelector('.field')
    const startQuizBtn = document.querySelector('#startQuizBtn')
    const numOfQuestions = document.querySelector('input[type="number"]')
    if (
        numOfQuestions.validity.rangeUnderflow ||
        numOfQuestions.validity.rangeOverflow ||
        numOfQuestions.value === ''
    ) {
        inputField.classList.add('error')
        startQuizBtn.setAttribute('disabled', 'disabled')
    } else {
        inputField.classList.remove('error')
        startQuizBtn.removeAttribute('disabled', 'disabled')
    }
}

export { showRangeError, showError }
