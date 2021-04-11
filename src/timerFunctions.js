const showTimeoutMsg = () => {
    const modal = document.querySelector('#myModal')
    const contentWrapper = document.querySelector('#contentWrapper')
    const startQuizBtn = document.createElement('button')
    startQuizBtn.textContent = 'Start new quiz'
    startQuizBtn.classList.add('newQuiz', 'close')
    contentWrapper.append(startQuizBtn)
    const timeoutMsg = document.querySelector('.timeoutMsg')
    modal.style.display = 'block'
    timeoutMsg.textContent = "You've run out of time!"
    document.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none'
    })
}

const createQuizTimer = (quizContainer) => {

    let remainingTime = 5
    const timerText = document.querySelector('#timerText')
    timerText.textContent = remainingTime
    const setTimer = () => {
        timerText.innerHTML = ''
        if (remainingTime !== 0) {
            remainingTime -= 1
            timerText.textContent = remainingTime
        } else {
            clearInterval(interval)
        }
    }
    const interval = setInterval(setTimer, 1000)

    setTimeout(() => {
        showTimeoutMsg()
        timerText.innerHTML = ''
        quizContainer.innerHTML = ''
    }, 5001)
}

export default createQuizTimer
