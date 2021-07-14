let timeout
let interval

const setQuizTimeLimit = () => {
    const number = document.querySelector('input[type="number"]')
    let timeLimit = 10000
    if (number.value > 20 && number.value < 40) {
        timeLimit += 5000
    }
    if (number.value >= 40) {
        timeLimit += 10000
    }
    return timeLimit
}

const showTimeoutMsg = () => {
    const modal = document.querySelector('#myModal')
    const timeoutMsg = document.querySelector('.timeoutMsg')
    modal.style.display = 'block'
    timeoutMsg.textContent = "You've run out of time!"
    document.querySelector('.close').addEventListener('click', () => {
        modal.style.display = 'none'
    })
}
const createQuizTimer = () => {
    const timeLimit = setQuizTimeLimit()
    let remainingTime = timeLimit / 1000
    const timerText = document.querySelector('#timerText')
    timerText.textContent = remainingTime
    const setTimer = () => {
        timerText.innerHTML = ''
        if (remainingTime !== 0) {
            remainingTime -= 1
            timerText.textContent = remainingTime
        }
    }
    interval = setInterval(setTimer, 1000)

    timeout = setTimeout(() => {
        showTimeoutMsg()
        timerText.innerHTML = ''
    }, timeLimit)
}

export { createQuizTimer, timeout, interval }
