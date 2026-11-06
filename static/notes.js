// ===== STUDYAI NOTES GENERATOR =====

const studyText = document.getElementById("study-text");

const generateButton = document.getElementById("generate-notes");
const clearButton = document.getElementById("clear-notes");
const copyButton = document.getElementById("copy-notes");

const summaryElement = document.getElementById("summary");
const keyPointsElement = document.getElementById("key-points");
const revisionElement = document.getElementById("revision");

// Generate notes
generateButton.addEventListener("click", function () {
	const text = studyText.value.trim();

	if (text.length === 0) {
		alert("Please enter your study material first!");
		return;
	}

	if (text.length < 30) {
		alert("Please enter at least 30 characters of study material.");
		return;
	}

	const sentences = text
		.split(/[.!?]+/)
		.map(sentence => sentence.trim())
		.filter(sentence => sentence.length > 0);

	if (sentences.length === 0) {
		alert("Please enter valid study material.");
		return;
	}

	const summary = sentences.slice(0, 3).join(". ") + ".";
	summaryElement.textContent = summary;

	const importantPoints = [...sentences]
		.sort((a, b) => b.length - a.length)
		.slice(0, Math.min(5, sentences.length));

	keyPointsElement.replaceChildren();
	importantPoints.forEach(function (point) {
		const listItem = document.createElement("li");
		listItem.textContent = point;
		keyPointsElement.appendChild(listItem);
	});

	revisionElement.replaceChildren();
	sentences.forEach(function (sentence, index) {
		const paragraph = document.createElement("p");
		paragraph.textContent = (index + 1) + ". " + sentence + ".";
		revisionElement.appendChild(paragraph);
	});

	const notesCount = Number(localStorage.getItem("notesCount")) || 0;
	localStorage.setItem("notesCount", notesCount + 1);

	alert("Your study notes have been generated!");
});

// Clear all content
clearButton.addEventListener("click", function () {
	studyText.value = "";
	summaryElement.textContent = "Your summary will appear here.";

	keyPointsElement.replaceChildren();
	const defaultPoint = document.createElement("li");
	defaultPoint.textContent = "Your important points will appear here.";
	keyPointsElement.appendChild(defaultPoint);

	revisionElement.textContent = "Your revision notes will appear here.";
});

// Copy generated notes
copyButton.addEventListener("click", async function () {
	const summary = summaryElement.textContent;
	const points = Array.from(keyPointsElement.children)
		.map(item => "- " + item.textContent)
		.join("\n");
	const revision = revisionElement.innerText;

	const allNotes =
		"STUDYAI NOTES\n\n" +
		"SUMMARY\n" + summary +
		"\n\nIMPORTANT POINTS\n" + points +
		"\n\nREVISION NOTES\n" + revision;

	if (summary === "Your summary will appear here.") {
		alert("Generate notes before copying!");
		return;
	}

	try {
		await navigator.clipboard.writeText(allNotes);
		alert("Your notes have been copied!");
	} catch (error) {
		alert("Unable to copy notes. Please try again.");
	}
});
