import generateQuizDOM from "./generateQuizDOM.js";


const renderQuiz = (newQuiz) => {
    let index = 0;
    let questionCounter = 1;
    const quizStartedAt = Date.now();
    generateQuizDOM(newQuiz, index, questionCounter, quizStartedAt);
  };

  export default renderQuiz