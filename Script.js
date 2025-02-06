let timer;
let isRunning = false;
let timeRemaining = 25 * 60; // 25 minutes in seconds
let isBreak = false;

const timerDisplay = document.getElementById('timer-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const notification = document.getElementById('notification');

// Function to format the time in mm:ss format
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Start or pause the timer
startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
    } else {
        timer = setInterval(countdown, 1000);
        startPauseBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
});

// Reset the timer
resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    timeRemaining = isBreak ? 5 * 60 : 25 * 60; // Reset to 25 minutes or 5 minutes (break)
    timerDisplay.textContent = formatTime(timeRemaining);
    startPauseBtn.textContent = 'Start';
    notification.textContent = '';
});

// Countdown function
function countdown() {
    if (timeRemaining > 0) {
        timeRemaining--;
        timerDisplay.textContent = formatTime(timeRemaining);
    } else {
        clearInterval(timer);
        isRunning = false;
        notification.textContent = isBreak ? 'Break time is over!' : 'Pomodoro session is over!';
        startPauseBtn.textContent = 'Start';
        isBreak = !isBreak; // Toggle between work and break
        timeRemaining = isBreak ? 5 * 60 : 25 * 60; // Reset the time for the next session or break
    }
}
