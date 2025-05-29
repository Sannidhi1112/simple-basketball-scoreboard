// Initialize team scores and timer variables
let team1Score = 0;
let team2Score = 0;
let remainingSeconds = 0;
let timerInterval = null;

const display = document.getElementById('timer-display');
const minutesInput = document.getElementById("minutes");

// Set timer based on minutes input
document.getElementById("set-timer").addEventListener("click", () => {
    const minutes = parseInt(minutesInput.value, 10);
    if (!isNaN(minutes)) {
        remainingSeconds = minutes * 60;
        updateTimerDisplay();
    } else {
        alert("Please enter a valid number of minutes!");
    }
});

// Function to update the timer display on the screen
function updateTimerDisplay() {
    const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
    const secs = String(remainingSeconds % 60).padStart(2, '0');
    display.textContent = `${mins}:${secs}`;
}

// Start the countdown timer
function startTimer() {
    if (remainingSeconds > 0 && !timerInterval) {
        timerInterval = setInterval(() => {
            remainingSeconds--;
            updateTimerDisplay();

            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Time's up!");
            }
        }, 1000);
    }
}

// Start button event listener
document.getElementById("start").addEventListener("click", startTimer);

// Pause the timer
document.getElementById("pause").addEventListener("click", () => {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

// Resume the timer using the same startTimer logic
document.getElementById("resume").addEventListener("click", startTimer);

// Reset the timer and input field
document.getElementById("reset").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    remainingSeconds = 0;
    updateTimerDisplay();
    minutesInput.value = 0;
});

// Function to update score of a team
function updateScore(team, points) {
    if (team === 1) {
        team1Score += points;
        document.getElementById("team1-score").textContent = team1Score;
    } else {
        team2Score += points;
        document.getElementById("team2-score").textContent = team2Score;
    }
}

// Team 1 scoring buttons
document.getElementById("team1-add1").addEventListener("click", () => updateScore(1, 1));
document.getElementById("team1-add2").addEventListener("click", () => updateScore(1, 2));
document.getElementById("team1-add3").addEventListener("click", () => updateScore(1, 3));

// Team 2 scoring buttons
document.getElementById("team2-add1").addEventListener("click", () => updateScore(2, 1));
document.getElementById("team2-add2").addEventListener("click", () => updateScore(2, 2));
document.getElementById("team2-add3").addEventListener("click", () => updateScore(2, 3));

// Reset both teams' scores
document.getElementById("reset-score").addEventListener("click", () => {
    team1Score = 0;
    team2Score = 0;
    document.getElementById("team1-score").textContent = team1Score;
    document.getElementById("team2-score").textContent = team2Score;
});
