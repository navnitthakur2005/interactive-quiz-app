const questions = [
{
    question: "What does HTML stand for?",
    answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "High Text Machine Language", correct: false },
        { text: "Hyper Transfer Markup Language", correct: false },
        { text: "Home Tool Markup Language", correct: false }
    ]
},
{
    question: "Which language is used for styling web pages?",
    answers: [
        { text: "HTML", correct: false },
        { text: "CSS", correct: true },
        { text: "Python", correct: false },
        { text: "Java", correct: false }
    ]
},
{
    question: "Which language makes a website interactive?",
    answers: [
        { text: "CSS", correct: false },
        { text: "JavaScript", correct: true },
        { text: "HTML", correct: false },
        { text: "SQL", correct: false }
    ]
},
{
    question: "Which tag is used to create a hyperlink?",
    answers: [
        { text: "<a>", correct: true },
        { text: "<link>", correct: false },
        { text: "<h1>", correct: false },
        { text: "<img>", correct: false }
    ]
},
{
    question: "Which company developed JavaScript?",
    answers: [
        { text: "Microsoft", correct: false },
        { text: "Netscape", correct: true },
        { text: "Google", correct: false },
        { text: "Apple", correct: false }
    ]
},
{
    question: "Which symbol is used for ID selector in CSS?",
    answers: [
        { text: "#", correct: true },
        { text: ".", correct: false },
        { text: "*", correct: false },
        { text: "&", correct: false }
    ]
},
{
    question: "Which method is used to print in the browser console?",
    answers: [
        { text: "console.print()", correct: false },
        { text: "print()", correct: false },
        { text: "console.log()", correct: true },
        { text: "document.write()", correct: false }
    ]
},
{
    question: "Which keyword is used to declare a constant in JavaScript?",
    answers: [
        { text: "let", correct: false },
        { text: "var", correct: false },
        { text: "const", correct: true },
        { text: "constant", correct: false }
    ]
},
{
    question: "Which HTML tag is used to display an image?",
    answers: [
        { text: "<image>", correct: false },
        { text: "<img>", correct: true },
        { text: "<picture>", correct: false },
        { text: "<src>", correct: false }
    ]
},
{
    question: "Which CSS property changes text color?",
    answers: [
        { text: "font-color", correct: false },
        { text: "text-color", correct: false },
        { text: "color", correct: true },
        { text: "background-color", correct: false }
    ]
}
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const questionNumber = document.getElementById("question-number");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionNumber.innerHTML =
        "Question " + (currentQuestionIndex + 1) + " of " + questions.length;

    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.innerHTML = answer.text;

        button.classList.add("btn");

        answerButtons.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

    });

}

function resetState() {

    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {

    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {

        selectedBtn.classList.add("correct");

        score++;

    } else {

        selectedBtn.classList.add("incorrect");

    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.classList.add("correct");

        }

        button.disabled = true;

    });

    nextButton.style.display = "block";

}

function showScore() {

    resetState();

    questionNumber.innerHTML = "";

    questionElement.innerHTML =
        `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Play Again";

    nextButton.style.display = "block";

}

function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();

    }

}

nextButton.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {

        handleNextButton();

    } else {

        startQuiz();

    }

});

startQuiz();