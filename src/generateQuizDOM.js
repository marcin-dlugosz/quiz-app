import generatePossibleAnswersDOM from "./generatePossibleAnsDOM.js";
import calculateDuration from "./calculateDuration.js";

const generateQuizDOM = (quizObj, index, questionCounter, quizStartedAt) => {
  const quizLength = quizObj.quiz.length;
  const quizContainer = document.querySelector("#quiz");
  const paragraph = document.createElement("p");
  const list = document.createElement("ol");
  const questionCount = document.createElement("p");
  const nextQuestionBtn = document.createElement("button");
  paragraph.innerHTML = quizObj.quiz[0].question;
  nextQuestionBtn.textContent = "Next Question";
  questionCount.textContent = `Question ${questionCounter}`;
  generatePossibleAnswersDOM(quizObj, index, list);

  nextQuestionBtn.addEventListener("click", () => {
    if (quizObj.correctAnswer) {
      quizObj.numOfCorrectAnswers++;
      quizObj.correctAnswer = "";
    }
    if (index === quizLength - 2) {
      // Changing the button's name when last question shown
      nextQuestionBtn.textContent = "Finish & go to score";
    }
    if (index < quizLength - 1) {
      index++;
      questionCounter++;
      questionCount.textContent = `Question ${questionCounter}`;
      list.innerHTML = "";
      paragraph.innerHTML = quizObj.quiz[index].question;
      generatePossibleAnswersDOM(quizObj, index, list);
    } else {
      quizContainer.innerHTML = `<p>Your result: ${
        quizObj.numOfCorrectAnswers
      } correct answers out of ${quizLength}</p>
                <p>Time it took: ${calculateDuration(quizStartedAt)}</p>`;
      quizObj.numOfCorrectAnswers = 0;
    }
  });
  quizContainer.append(paragraph, list, nextQuestionBtn, questionCount);
};

export default generateQuizDOM;
