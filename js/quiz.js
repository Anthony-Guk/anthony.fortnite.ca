"use strict";
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const questionContainer = document.getElementById("question-container")
var currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
var locked = false;

// JQuery post json code
jQuery["postJSON"] = function( data, callback ) {
    // shift arguments if data argument was omitted
    if ( jQuery.isFunction( data ) ) {
        callback = data;
        data = undefined;
    }
  
    return jQuery.ajax({
        url: "api/quiz",
        type: "POST",
        contentType:"application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        success: callback
    });
  };

startButton.addEventListener('click', startGame);

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame()
{
    startButton.classList.add("hide");
    questionContainer.classList.remove("hide");
    setNextQuestion();
}


function setNextQuestion()
{
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question)
{
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.Text;
        button.classList.add("button");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState()
{
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedButton = e.target;
    $.postJSON({"roundNumber":currentQuestionIndex,"playerChoice":answer.Text}, function (data) {
        if (data.answer == true) {
            button.dataset.correct = answer.correct;
        }
    });
    setStatusClass(document.body, button.dataset.correct);
    Array.from(answerButtons.children).forEach(button =>
    {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1)
    {
        nextButton.classList.remove("hide");
    }
    else
    {
        console.log("You won!");
    }
}

function setStatusClass(element, correct)
{
    clearStatusClass(element);
    if (correct)
    {
        element.classList.add("correct");
    }
    else
    {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element)
{
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

const questions = [
    {
        question: "What is the coolest website?",
        answers: [
            {Text: "Anthony's Website"},
            {Text: "Not Anthony's Website"},
        ]
    },
    {
        question: "What is the answer to 3 ÷ 0?",
        answers: [
            {Text: "Anthony's Website"},
            {Text: "Not Anthony's Website"},
        ]
    }   
]
