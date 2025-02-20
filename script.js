let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let audio = new Audio();

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const timeInput = document.getElementById('time-input');
const backgroundSelect = document.getElementById('background-select');
const saveSettings = document.getElementById('save-settings');
const themeToggle = document.getElementById('theme-toggle');
const music1Btn = document.getElementById('music1-btn');
const music2Btn = document.getElementById('music2-btn');
const music3Btn = document.getElementById('music3-btn');

function updateDisplay() {
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timer);
                    isRunning = false;
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = parseInt(timeInput.value) || 25;
    seconds = 0;
    updateDisplay();
}

function changeBackground(bg) {
    document.body.style.background = `url('${bg}') no-repeat center center/cover`;
}

function openSettings() {
    settingsModal.style.display = "block";
}

function closeSettingsModal() {
    settingsModal.style.display = "none";
}

function saveSettingsChanges() {
    minutes = parseInt(timeInput.value) || 25;
    seconds = 0;
    updateDisplay();
    
    const selectedBg = backgroundSelect.value;
    changeBackground(selectedBg);
    closeSettingsModal();
}

function playMusic(track) {
    audio.src = `${track}.mp3`;
    audio.play();
}

// 🟢 Toggle Theme (Light/Dark)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeToggle.textContent = isDark ? "☀️" : "🌙";
}

// 🟢 Theme onthouden
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('darkMode') === "true") {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = "☀️";
    }
});

// Event Listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
settingsBtn.addEventListener('click', openSettings);
closeSettings.addEventListener('click', closeSettingsModal);
saveSettings.addEventListener('click', saveSettingsChanges);
themeToggle.addEventListener('click', toggleTheme);

music1Btn.addEventListener('click', () => playMusic('music1'));
music2Btn.addEventListener('click', () => playMusic('music2'));
music3Btn.addEventListener('click', () => playMusic('music3'));

updateDisplay();
