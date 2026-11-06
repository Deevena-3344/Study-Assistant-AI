// Sample quiz questions
const questionBank = [
	{
		question: "What does HTML stand for?",
		options: [
			"Hyper Text Markup Language",
			"High Text Machine Language",
			"Hyper Transfer Markup Language",
			"Home Tool Markup Language"
		],
		answer: 0
	},
	{
		question: "Which language is used for styling websites?",
		options: ["Python", "CSS", "C++", "Java"],
		answer: 1
	},
	{
		question: "Which keyword is used to define a function in Python?",
		options: ["function", "define", "def", "func"],
		answer: 2
	},
	{
		question: "Which company developed JavaScript?",
		options: ["Microsoft", "Netscape", "Google", "Apple"],
		answer: 1
	},
	{
		question: "Which data structure stores key-value pairs in Python?",
		options: ["List", "Tuple", "Dictionary", "Set"],
		answer: 2
	},
	{
		question: "Which HTML tag creates a hyperlink?",
		options: ["<link>", "<a>", "<href>", "<url>"],
		answer: 1
	},
	{
		question: "What does CSS stand for?",
		options: [
			"Computer Style Sheets",
			"Creative Style System",
			"Cascading Style Sheets",
			"Colorful Style Sheets"
		],
		answer: 2
	},
	{
		question: "Which symbol starts a comment in Python?",
		options: ["//", "#", "/*", "<!--"],
		answer: 1
	},
	{
		question: "Which function displays output in Python?",
		options: ["echo()", "show()", "print()", "display()"],
		answer: 2
	},
	{
		question: "Which of these is a JavaScript variable keyword?",
		options: ["let", "define", "integer", "character"],
		answer: 0
	}
];

// Get HTML elements
const topicInput = document.getElementById("topic");
const questionCount = document.getElementById("question-count");
const startButton = document.getElementById("start-quiz");
const submitButton = document.getElementById("submit-quiz");
const restartButton = document.getElementById("restart-quiz");
const quizQuestions = document.getElementById("quiz-questions");
const quizResult = document.getElementById("quiz-result");

let currentQuestions = [];

startButton.addEventListener("click", function () {
	const topic = topicInput.value.trim();

	if (!topic) {
		alert("Please enter a subject or topic.");
		return;
	}

	const count = Number(questionCount.value);
	if (!Number.isInteger(count) || count < 1) {
		alert("Please enter a valid number of questions.");
		return;
	}

	// This demo bank only contains 10 questions.
	// We can generate more topics with real AI later.
	currentQuestions = [...questionBank]
		.sort(() => Math.random() - 0.5)
		.slice(0, Math.min(count, questionBank.length));

	displayQuiz();
	quizResult.textContent = "";
	submitButton.hidden = false;
	restartButton.hidden = true;
});

function displayQuiz() {
	quizQuestions.innerHTML = "";

	currentQuestions.forEach(function (question, index) {
		const card = document.createElement("div");
		card.className = "question-card";

		const title = document.createElement("h3");
		title.textContent = (index + 1) + ". " + question.question;
		card.appendChild(title);

		question.options.forEach(function (option, optionIndex) {
			const label = document.createElement("label");
			label.className = "option-label";

			const radio = document.createElement("input");
			radio.type = "radio";
			radio.name = "question-" + index;
			radio.value = optionIndex;

			label.appendChild(radio);
			label.appendChild(document.createTextNode(" " + option));
			card.appendChild(label);
			card.appendChild(document.createElement("br"));
		});

		quizQuestions.appendChild(card);
	});
}

submitButton.addEventListener("click", function () {
	let score = 0;
	let unanswered = false;

	currentQuestions.forEach(function (question, index) {
		const selected = document.querySelector(
			'input[name="question-' + index + '"]:checked'
		);

		if (!selected) {
			unanswered = true;
		} else if (Number(selected.value) === question.answer) {
			score += 1;
		}
	});

	if (unanswered) {
		alert("Please answer every question before submitting.");
		return;
	}

	quizResult.textContent = "You scored " + score + " out of " + currentQuestions.length + ".";
	submitButton.hidden = true;
	restartButton.hidden = false;
});

restartButton.addEventListener("click", function () {
	currentQuestions = [];
	quizQuestions.innerHTML = "";
	quizResult.textContent = "";
	submitButton.hidden = true;
	restartButton.hidden = true;
});
