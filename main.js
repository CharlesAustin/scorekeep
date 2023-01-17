import './style.css';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();
const gameNums = document.querySelector("#gameNums");
const playerPrompt = document.querySelector("#playerPrompt");
const reset = document.querySelector("#resetScores");
let isGameOver = false;

const players = {
    1: {
        score: 0,
        button: document.querySelector("#playerOne"),
        disp: document.querySelector("#playerOneScore"),
    },
    2: {
        score: 0,
        button: document.querySelector("#playerTwo"),
        disp: document.querySelector("#playerTwoScore"),
    },
};

for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    if (i === 1) {
        option.setAttribute("selected", "selected");
    }
    option.value = i;
    option.textContent = i;
    gameNums.append(option);
}

let scoreLimit = parseInt(gameNums.value);

const addPoint = (playerNum) => {
    if (!isGameOver) {
        players[playerNum].score += 1;
        players[playerNum].disp.textContent = players[playerNum].score;
    }

    if (players[playerNum].score === scoreLimit) {
        isGameOver = true;
        playerPrompt.textContent = `Player ${playerNum} wins!`;
        jsConfetti.addConfetti();
        for (let p of Object.values(players)) {
            p.button.setAttribute("disabled", "");
        }
        players[playerNum].disp.classList.toggle("border-teal-400");
        players[playerNum].disp.classList.toggle("shadow-lg");
        players[playerNum].disp.classList.toggle("shadow-teal-400");
    }
};

for (const [k, v] of Object.entries(players)) {
    v.button.addEventListener("click", () => {
        addPoint(k);
    });
}

reset.addEventListener("click", () => {
    gameNums.selectedIndex = 0;
    scoreLimit = parseInt(gameNums.value);
    isGameOver = false;
    playerPrompt.textContent = `Use the buttons below to keep score.`;

    for (const p of Object.values(players)) {
        p.score = 0;
        p.disp.textContent = 0;
        p.button.removeAttribute("disabled");
        p.disp.classList.remove("border-teal-400");
        p.disp.classList.remove("shadow-lg");
        p.disp.classList.remove("shadow-teal-400");
    }
});

gameNums.addEventListener("change", (e) => {
    scoreLimit = parseInt(e.target.value);
});
