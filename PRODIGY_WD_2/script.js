
let startTime, updatedTime, difference, interval;
let running = false;
const lapsContainer = document.getElementById('laps');
const timeDisplay = document.getElementById('time');

document.getElementById('start').addEventListener('click', () => {
    if (!running) {
        running = true;
        startTime = new Date().getTime() - (difference || 0);
        interval = setInterval(updateTime, 100);
    }
});

document.getElementById('stop').addEventListener('click', () => {
    if (running) {
        clearInterval(interval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
});

document.getElementById('reset').addEventListener('click', () => {
    clearInterval(interval);
    running = false;
    difference = 0;
    timeDisplay.innerHTML = "00:00:00";
    lapsContainer.innerHTML = "";
});

document.getElementById('lap').addEventListener('click', () => {
    if (running) {
        const lapTime = timeDisplay.innerHTML;
        const lapElement = document.createElement('div');
        lapElement.classList.add('lap-time');
        lapElement.innerText = lapTime;
        lapsContainer.appendChild(lapElement);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    timeDisplay.innerHTML = 
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}