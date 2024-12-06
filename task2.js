// Selecting required elements
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

// Timer variables
let timerInterval;
let milliseconds = 0, seconds = 0, minutes = 0;
let isRunning = false;

// Start the stopwatch
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            milliseconds += 10;
            if (milliseconds === 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);
    }
}

// Pause the stopwatch
function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

// Reset the stopwatch
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    lapsList.innerHTML = ''; // Clear laps
}

// Record a lap
function recordLap() {
    if (isRunning) {
        const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatMilliseconds(milliseconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

// Update the display
function updateDisplay() {
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    millisecondsElement.textContent = formatMilliseconds(milliseconds);
}

// Format time values
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

function formatMilliseconds(value) {
    return value < 100 ? (value < 10 ? `00${value}` : `0${value}`) : value;
}

// Event listeners
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
