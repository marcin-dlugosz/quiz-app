class QuizGame {
    constructor(quiz, numbOfCorrectAnswers = 0, correctAnswer = '', url = 'https://opentdb.com/api.php?amount=10&') {
        this.quiz = quiz
        this.correctAnswer = correctAnswer
        this.numbOfCorrectAnswers = numbOfCorrectAnswers
        this.url = url
    }

    generatePossibleAnswersDOM = (index, list) => {
        this.quiz[index].possibleAnswers.forEach((option) => {
            const listItem = document.createElement('li')
            const input = document.createElement('input')
            const label = document.createElement('label')
            label.setAttribute('for', option)
            label.innerHTML = option
            input.type = 'radio'
            input.name = 'possibleAnswers'
            input.id = option
            input.value = option
            listItem.append(input, label)
            list.append(listItem)
            // Radio button event for possible answers
            input.addEventListener('change', (e) => {
                if (e.target.value === this.quiz[index].correct_answer) {
                    this.correctAnswer = e.target.value
                } else {
                    this.correctAnswer = ''
                }
            })
        })
    }
}
const quizGame = new QuizGame()
const quizContainer = document.querySelector('#quiz')

// Set up an event handler for manipulating query string
document.querySelector('#selectionFields').addEventListener('change', (e) => {
    const url = new URL(quizGame.url)
    const params = new URLSearchParams(url.search)
    if (e.target.value !== '') {
        params.set(e.target.name, e.target.value)
    } else {
        params.delete(e.target.name)
    }
    const appendedParams = params.toString()
    quizGame.url = `https://opentdb.com/api.php?${appendedParams}`
})

const getQuiz = async () => {
    try {
        const quizRequest = await fetch(quizGame.url)
        return await quizRequest.json()
    } catch (e) {
        quizContainer.innerHTML = 'no resource found'
    }
}

const showQuiz = () => {
    let index = 0
    let questionCounter = 1
    const quizStartedAt = Date.now()
    const paragraph = document.createElement('p')
    const list = document.createElement('ol')
    const questionCount = document.createElement('p')
    const nextQuestionBtn = document.createElement('button')
    paragraph.innerHTML = quizGame.quiz[0].question
    nextQuestionBtn.textContent = 'Next Question'
    questionCount.textContent = `Question ${questionCounter}`
    quizGame.generatePossibleAnswersDOM(0, list)

    nextQuestionBtn.addEventListener('click', () => {
        if (quizGame.correctAnswer) {
            quizGame.numbOfCorrectAnswers++
            quizGame.correctAnswer = ''
        }
        if (index === quizGame.quiz.length - 2) {  // Changing the button's name when last question shown
            nextQuestionBtn.textContent = 'Finish & go to score'
        }
        if (index < quizGame.quiz.length - 1) {
            index++
            questionCounter++
            questionCount.textContent = `Question ${questionCounter}`
            list.innerHTML = ''
            paragraph.innerHTML = quizGame.quiz[index].question
            quizGame.generatePossibleAnswersDOM(index, list)
        } else {
            quizContainer.innerHTML = `<p>Your result: ${quizGame.numbOfCorrectAnswers} correct answers out of ${quizGame.quiz.length}</p>
            <p>Time it took: ${calculateDuration(quizStartedAt)}</p>`
            quizGame.numbOfCorrectAnswers = 0
        }
    })
    quizContainer.append(paragraph, list, nextQuestionBtn, questionCount)
}
const calculateDuration = (startedAt) => {
    let duration = 0
    const seconds = ((Date.now() - startedAt) / 1000).toFixed(0)
    if (seconds > 59) {
        const minutes = (seconds / 60)
        const fullMinutes = Math.floor(minutes)
        const extractedSeconds = `${((minutes - fullMinutes) * 60).toFixed(0)}`
        duration = `${fullMinutes} minute(s) ${extractedSeconds} second(s)`
    } else {
        duration = Math.floor(seconds) + ' seconds'
    }
    return duration
}

const createPossibleAnswersArr = (quizObj) => {
    const incorrectAnswers = quizObj.incorrect_answers.slice()
    quizObj.possibleAnswers = incorrectAnswers
    const index = Math.ceil(Math.random() * incorrectAnswers.length)
    quizObj.possibleAnswers.splice(index - 1, 0, quizObj.correct_answer)
}

document.querySelector('#newQuiz').addEventListener('click', async (e) => {
    quizContainer.innerHTML = ''
    const loader = document.querySelector('#loader')
    loader.className = 'spinner'
    e.target.disabled = true
    try {
        const response = await getQuiz()
        if (response.response_code === 1 || response.response_code === 2) {
            e.target.disabled = false
            loader.className = ''
            throw 'Please change criteria or try again'
        }
        loader.className = ''
        e.target.disabled = false
        let quizArray = response.results.slice()
        quizGame.quiz = quizArray
        quizGame.quiz.forEach((obj) => {
            createPossibleAnswersArr(obj)
        })

    } catch (err) {
        quizContainer.innerHTML = err
    }
    showQuiz()

    console.log(quizGame.quiz)
})

