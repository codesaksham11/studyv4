let flashcards = [];
let currentIndex = 0;
const card = document.getElementById("flashcard");
const flipBtn = document.getElementById("flip-btn");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const backBtn = document.getElementById("back-btn");
const message = document.getElementById("message");

async function loadFlashcards() {
    const selectedTopics = JSON.parse(localStorage.getItem("selectedTopics") || "[]");
    flashcards = [];

    for (const topic of selectedTopics) {
        try {
            const response = await fetch(`flashcards/${topic}.js`);
            if (response.ok) {
                const script = document.createElement("script");
                script.src = `flashcards/${topic}.js`;
                document.body.appendChild(script);
                script.onload = () => {
                    flashcards = flashcards.concat(window[topic.split('/')[1].replace(/-/g, '_')]);
                    if (flashcards.length > 0) shuffleFlashcards();
                };
            }
        } catch (e) {
            console.warn(`Flashcards for ${topic} not found.`);
        }
    }

    if (flashcards.length === 0) showMessage();
    else displayFlashcard();
}

function shuffleFlashcards() {
    flashcards = flashcards.sort(() => Math.random() - 0.5);
    currentIndex = 0;
    displayFlashcard();
}

function displayFlashcard() {
    if (currentIndex >= flashcards.length) {
        showMessage();
        return;
    }
    card.classList.remove("flipped");
    card.querySelector(".front").textContent = flashcards[currentIndex].front;
    card.querySelector(".back").textContent = flashcards[currentIndex].back;
    message.style.display = "none";
}

function showMessage() {
    message.style.display = "block";
    card.style.display = "none";
    flipBtn.style.display = "none";
    nextBtn.style.display = "none";
    resetBtn.textContent = "Refresh";
}

flipBtn.addEventListener("click", () => {
    card.classList.toggle("flipped");
});

nextBtn.addEventListener("click", () => {
    currentIndex++;
    displayFlashcard();
});

resetBtn.addEventListener("click", () => {
    shuffleFlashcards();
    card.style.display = "block";
    flipBtn.style.display = "inline";
    nextBtn.style.display = "inline";
    resetBtn.textContent = "Reset";
});

backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

loadFlashcards();
