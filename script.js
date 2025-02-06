const colorBox = document.getElementById("colorBox");
const options = document.querySelectorAll(".color-option");
const gameStatus = document.getElementById("gameStatus");
const scoreElement = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
let score = 0;
let targetColor;

function generateRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function startGame() {
    targetColor = generateRandomColor();
    colorBox.style.backgroundColor = targetColor;
    const correctIndex = Math.floor(Math.random() * options.length);
    
    options.forEach((button, index) => {
        const randomColor = generateRandomColor();
        button.style.backgroundColor = randomColor;
        button.onclick = () => checkGuess(button, button.style.backgroundColor);
        button.classList.remove("fade-out", "celebrate");
        if (index === correctIndex) {
            button.style.backgroundColor = targetColor;
        }
    });
}

function checkGuess(button, selectedColor) {
    if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct!";
        gameStatus.style.color = "green";
        score++;
        scoreElement.textContent = score;
        button.classList.add("celebrate");
        correctSound.play();
    } else {
        gameStatus.textContent = "Wrong! Try again.";
        gameStatus.style.color = "red";
        button.classList.add("fade-out");
        wrongSound.play();
        setTimeout(() => button.classList.remove("fade-out"), 1000);
    }
}

newGameButton.addEventListener("click", () => {
    gameStatus.textContent = "";
    startGame();
});

startGame();