class QuizGame {
  constructor(quiz) {
    this.quiz = quiz;
    this.correctAnswer = "";
    this.numOfCorrectAnswers = 0;
  }

  createPossibleAnswersArr() {
    this.quiz.forEach((obj) => {
      obj.possibleAnswers = [];
      const possibleAnswersArr = [...obj.incorrect_answers];
      const index = Math.ceil(Math.random() * possibleAnswersArr.length);
      possibleAnswersArr.splice(index - 1, 0, obj.correct_answer);
      possibleAnswersArr.forEach((possAns) => {
        obj.possibleAnswers.push({ name: possAns, marked: false });
      });
    });
  }

  setCorrectAns(e, index) {
    if (e.target.value === this.quiz[index].correct_answer) {
      this.correctAnswer = e.target.value;
    } else {
      this.correctAnswer = "";
    }
  }
}

export default QuizGame;
