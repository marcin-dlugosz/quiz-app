import modifyURL from './modifyURL.js'
import showQuiz from './showQuiz.js'

let quizOptionsURL = 'https://opentdb.com/api.php?amount=10'

document
    .querySelector('#selectFieldsWrapper')
    .addEventListener('change', (e) => {
        quizOptionsURL = `https://opentdb.com/api.php?${modifyURL(
            e,
            quizOptionsURL
        )}`
    })
    const number = document.querySelector('input[type="number"]')
    const inputField = document.querySelector('.field')
    const startQuizBtn = document.querySelector('#startQuizBtn')
    number.addEventListener('input', (e)=> {
        if (number.validity.rangeUnderflow || number.validity.rangeOverflow || number.value === '') {
            inputField.classList.add('error')
            startQuizBtn.setAttribute('disabled', 'disabled')
            
        } else {
             inputField.classList.remove('error')
             startQuizBtn.removeAttribute('disabled', 'disabled')

        }
    })


document.querySelector('.newQuiz').addEventListener('click', async (e) => {
    document.querySelector('#quizContainer').innerHTML = ''
    document.querySelector('.finishedQuizContainer').innerHTML = ''
    await showQuiz(e, quizOptionsURL)
})

// jquery functions
$('select.dropdown').dropdown()
