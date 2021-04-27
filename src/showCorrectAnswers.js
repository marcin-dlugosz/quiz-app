import getCorrectAnswers from './getCorrectAnswers.js'

const showCorrectAnswers = (quizContainer, quiz) => {
    const modalBtn = document.createElement('button')
    modalBtn.id = 'myBtn'
    modalBtn.textContent = 'Show correct answers'
    quizContainer.append(modalBtn)
    // Get the modal
    const modal = document.querySelector('#myModal')
    // When the user clicks on the button, open the modal
    modalBtn.addEventListener('click', () => {
        document.querySelector('.finishedQuizContainer').innerHTML = ''
        modal.style.display = 'block'
        document.querySelector('.modal').scrollTo(0, 0)
        getCorrectAnswers(quiz)
    })

    // When the user clicks on <span> (x), close the modal
    // document.querySelector('.close').addEventListener('click', () => {
    //     modal.style.display = 'none'
    // })

    // When the user clicks anywhere outside of the modal, close it
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = 'none'
        }
    })
}
export default showCorrectAnswers
