let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

const display = () => {
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
};

const updateTimer = () => {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            document.getElementById('alarmSound').play();
            alert('Timer afgelopen!');
            return;
        }
        minutes--;
        seconds = 59;
    } else {
        seconds--;
    }
    display();
};

document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
});

document.getElementById('pause').addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    minutes = parseInt(document.getElementById('pomodoro').value);
    seconds = 0;
    display();
});

document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('settings-menu').classList.toggle('hidden');
});

document.getElementById('save-settings').addEventListener('click', () => {
    minutes = parseInt(document.getElementById('pomodoro').value);
    document.body.classList.toggle('dark-mode', document.getElementById('darkMode').checked);
    document.getElementById('settings-menu').classList.add('hidden');
    display();
});

display();
