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




document.querySelector('.newQuiz').addEventListener('click', showQuiz)

// jquery functions
$('select.dropdown').dropdown()
