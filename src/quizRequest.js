const getQuiz = async (url) => {
    const response = await fetch(url)
    if (response.status === 200) {
        const data = await response.json()
        return data
    } else {
        throw 'Unable to get a quiz! Please reload the page or try again later.'
    }
}
export default getQuiz
