const generatePossibleAnsDOM = (quizObj, index, list)=> {
    quizObj.quiz[index].possibleAnswers.forEach(({name}) => {
        const listItem = document.createElement("li");
        const input = document.createElement("input");
        const label = document.createElement("label");
        label.setAttribute("for", name);
        label.innerHTML = name;
        input.type = "radio";
        input.name = "possibleAnswers";
        input.id = name;
        input.value = name;
        listItem.append(input, label);
        list.append(listItem);
        // Radio button event for possible answers
        input.addEventListener("change", (e) => {
            quizObj.setCorrectAns(e, index)
        });
    })
}
export default generatePossibleAnsDOM