const setQueryString = (e, quizURL)=> {
    const url = new URL(quizURL);
    const params = new URLSearchParams(url.search);
    if (e.target.value !== "") {
      params.set(e.target.name, e.target.value);
    } else {
      params.delete(e.target.name);
    }
    const appendedParams = params.toString();
    quizURL = `https://opentdb.com/api.php?${appendedParams}`;
    console.log(quizURL);
} 

export default setQueryString