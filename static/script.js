// ===== STUDYAI DASHBOARD =====

// Get saved study statistics
let studyCount = Number(localStorage.getItem("studyCount")) || 0;
let notesCount = Number(localStorage.getItem("notesCount")) || 0;
let quizCount = Number(localStorage.getItem("quizCount")) || 0;

// Get HTML elements
const studyElement = document.getElementById("study-count");
const notesElement = document.getElementById("notes-count");
const quizElement = document.getElementById("quiz-count");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");

// Update dashboard
function updateDashboard() {
    studyElement.textContent = studyCount;
    notesElement.textContent = notesCount;
    quizElement.textContent = quizCount;

    const progress = Math.min((studyCount / 5) * 100, 100);

    progressFill.style.width = progress + "%";

    progressText.textContent =
        studyCount + " of 5 sessions completed";
}

// Complete study session
document.getElementById("complete-session")
    .addEventListener("click", function () {

        studyCount++;

        localStorage.setItem("studyCount", studyCount);

        updateDashboard();
    });

// ===== DEMO CHATBOT =====

const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const messages = document.getElementById("messages");

chatForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const question = userInput.value.trim();

    if (question === "") return;

    // Display student message
    const userMessage = document.createElement("div");

    userMessage.className = "user-message";
    userMessage.textContent = question;

    messages.appendChild(userMessage);

    // Display demo AI response
    const botMessage = document.createElement("div");

    botMessage.className = "bot-message";

    botMessage.textContent =
        "Thanks for your question! A real AI response will be connected in our upcoming AI integration step.";

    messages.appendChild(botMessage);

    userInput.value = "";

    messages.scrollTop = messages.scrollHeight;
});

// ===== SIDEBAR NAVIGATION =====

const navLinks = document.querySelectorAll(".sidebar nav a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });

});

// Load saved dashboard statistics
updateDashboard();
