document.addEventListener('DOMContentLoaded', function() {
    // Timer-related variables and functionality
    const totalDuration = typeof timerDuration !== 'undefined' ? timerDuration : 25 * 60;
    let remainingTime = totalDuration;
    let timerInterval = null;

    // Get references to DOM elements for the timer
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    const timeDisplay = document.getElementById('time-display');
    const progressBar = document.getElementById('progress-bar');

    // Function to format and update the display
    function updateDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar width
        const progressPercent = ((totalDuration - remainingTime) / totalDuration) * 100;
        progressBar.style.width = progressPercent + '%';
    }

    // Start the timer countdown
    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                if (remainingTime > 0) {
                    remainingTime--;
                    updateDisplay();
                } else {
                    // Timer reached 0, automatically pause the timer
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert("Time's up!");
                }
            }, 1000);
        }
    }

    // Pause the timer
    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Reset the timer back to the original duration
    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        remainingTime = totalDuration;
        updateDisplay();
    }

    // Attach event listeners to timer control buttons
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    // Initialize the timer display on page load
    updateDisplay();

    // Audio-related functionality
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const musicIndicator = document.getElementById('music-indicator');

    // Handle play/pause for music
    playPauseButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play().catch(error => {
                console.error("Error attempting to play audio:", error);
            });
            // Show pause icon and hide play icon
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline-block';
            playPauseButton.classList.add('playing'); 
            musicIndicator.textContent = '🎵 Music On'; 
            musicIndicator.classList.add('playing'); 
            musicIndicator.classList.remove('paused'); 
        } else {
            audioPlayer.pause();
            // Show play icon and hide pause icon
            playIcon.style.display = 'inline-block';
            pauseIcon.style.display = 'none';
            playPauseButton.classList.remove('playing'); 
            musicIndicator.textContent = '🎵 Music Off'; 
            musicIndicator.classList.add('paused');
            musicIndicator.classList.remove('playing');
        }
    });

    // Dark Mode Toggle
    const themeButton = document.getElementById('theme-button');
    const darkModeIndicator = document.getElementById('dark-mode-indicator');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    themeButton.addEventListener('click', () => {
        // Toggle dark mode
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');

        // Change the text and icon based on mode
        if (document.body.classList.contains('dark-mode')) {
            darkModeIndicator.textContent = '🌑 Dark Mode On';
            darkModeIndicator.classList.add('active');
            darkModeIndicator.classList.remove('inactive');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline-block';
        } else {
            darkModeIndicator.textContent = '🌙 Dark Mode Off';
            darkModeIndicator.classList.add('inactive');
            darkModeIndicator.classList.remove('active');
            sunIcon.style.display = 'inline-block';
            moonIcon.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const soundSelect = document.getElementById('sound-select');
    const backgroundSelect = document.getElementById('background-select');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const saveButton = document.getElementById('save-button');

    // Load saved settings from localStorage (or session, if available)
    const savedSound = localStorage.getItem('music') || 'lofi.mp3'; 
    const savedBackground = localStorage.getItem('background') || 'forest.jpg'; 
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
document.addEventListener('DOMContentLoaded', function() {
    // Timer-related variables and functionality
    const pomodoroDuration = 25 * 60; // 25 minutes
    const breakDuration = 5 * 60; // 5 minutes
    let remainingTime = pomodoroDuration;
    let timerInterval = null;

    // Get references to DOM elements for the timer
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    const pomodoroButton = document.getElementById('pomodoro-button');
    const breakButton = document.getElementById('break-button');
    const timeDisplay = document.getElementById('time-display');
    const progressBar = document.getElementById('progress-bar');

    function updateDisplay() {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        const progressPercent = ((pomodoroDuration - remainingTime) / pomodoroDuration) * 100;
        progressBar.style.width = progressPercent + '%';
    }

    function startTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                if (remainingTime > 0) {
                    remainingTime--;
                    updateDisplay();
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert("Time's up!");
                }
            }, 1000);
        }
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        remainingTime = pomodoroDuration;
        updateDisplay();
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);

    pomodoroButton.addEventListener('click', () => {
        pauseTimer();
        remainingTime = pomodoroDuration;
        startTimer();
    });

    breakButton.addEventListener('click', () => {
        pauseTimer();
        remainingTime = breakDuration;
        updateDisplay();
        startTimer();
    });

    updateDisplay();
});

    // Set the selected options based on saved settings
    soundSelect.value = savedSound;
    backgroundSelect.value = savedBackground;
    darkModeToggle.checked = savedDarkMode;

    // Handle save button click
    saveButton.addEventListener('click', function() {
        // Save the user's settings to localStorage
        localStorage.setItem('music', soundSelect.value);
        localStorage.setItem('background', backgroundSelect.value);
        localStorage.setItem('dark-mode', darkModeToggle.checked);

        // Apply dark mode toggle
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }

        // Redirect to the main page or reload
        alert('Settings saved!');
        window.location.href = '/';  
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const timerDisplay = document.getElementById('time-display');
    const timerColor = localStorage.getItem('timer_color') || '#ffffff';
    timerDisplay.style.color = timerColor;

    // Save the timer color when changed in settings
    const timerColorInput = document.getElementById('timer_color');
    if (timerColorInput) {
        timerColorInput.addEventListener('change', function() {
            localStorage.setItem('timer_color', timerColorInput.value);
            timerDisplay.style.color = timerColorInput.value;
        });
    }
});

