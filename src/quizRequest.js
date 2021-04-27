const getQuiz = async (url) => {
    const response = await fetch(url)
    if (response.status === 200) {
        const data = await response.json()
        return data
    }
}
export default getQuiz
