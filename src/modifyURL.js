const modifyURL = (e, quizUrl) => {
    const url = new URL(quizUrl)
    const params = new URLSearchParams(url.search)
    if (e.target.value !== '') {
        params.set(e.target.name, e.target.value)
    }
    const appendedParams = params.toString()
    return appendedParams
}

export default modifyURL
