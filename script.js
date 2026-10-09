const words = ["lion",
    "elephant",
    "mammoth",
    "gorilla",
    "dobberman",
    "horse",
    "python",
    "lioness",
];

let word = words[Math.floor(Math.random() * words.length)];

const wordDisplayEl = document.querySelector("#word-display");

let guessedLetters = [];

let lives = 6;

const keyboardEl = document.querySelector("#keyboard");

const livesEl = document.querySelector("#lives");

const messageEl = document.querySelector("#message");

const wordWasEl = document.querySelector("#word-is");

const restartEl = document.querySelector("#restart");

function renderWord() {
    const result = word.split("").map(letter =>
        guessedLetters.includes(letter) ? letter : "_"
    ).join(" ")
    wordDisplayEl.textContent = result;
}



function buildKeyboard() {
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i);
        const btn = document.createElement("button");
        btn.textContent = letter;
        btn.id = letter;
        keyboardEl.appendChild(btn);

        btn.addEventListener("click", () => {
            handleGuess(letter);
        })
    }
}

function handleGuess(letter) {
    guessedLetters.push(letter);

    const wrongGuesses = guessedLetters.filter(
        l => !word.includes(l)
    );
    lives = 6 - wrongGuesses.length;
    livesEl.textContent = `You have ${lives} ${lives <= 1 ? "life" : "lives"} ${lives === 0 ? "attemps" : "remaining"}`;
    document.getElementById(letter).disabled = true;
    renderWord();
    if (word.split("").includes(letter)) {
        document.getElementById(letter).classList.add("correct");
    }
    else {
        document.getElementById(letter).classList.add("wrong");
    }
    if (lives === 0) {
        messageEl.textContent = `Game over!`;
        wordWasEl.textContent = `The word was ${word.toUpperCase()}`
        document.querySelectorAll("#keyboard button").forEach(btn => {
            btn.disabled = true;
        })
        return;
    }
    if (word.split("").every(l => guessedLetters.includes(l))) {
        messageEl.textContent = `You Won!`;
        document.querySelectorAll("#keyboard button").forEach(btn => {
            btn.disabled = true;
        })
        return;
    }

}

function handleRestart() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    lives = 6;
    messageEl.textContent = "";
    wordWasEl.textContent = "";
    livesEl.textContent = `Lives: ${lives}`
    document.querySelectorAll("#keyboard button").forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("correct", "wrong");
    })
    renderWord();
}

restartEl.addEventListener("click", () => {
    handleRestart();
})

renderWord()
buildKeyboard()
console.log(word.split(""));
console.log(guessedLetters);

