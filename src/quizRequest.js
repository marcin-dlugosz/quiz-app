import {showError} from './errors.js'
const getQuiz = async (url) => {
    try {
        const response = await fetch(url)
        if (response.ok) {
            return response.json()
        }
    } catch (err) {
        showError(err)
    }
}
export default getQuiz
