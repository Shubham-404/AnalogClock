const hr = document.querySelector('.hand-hr');
const min = document.querySelector('.hand-min ');
const sec = document.querySelector('.hand-sec ');
const TODAY = document.querySelector('.today ');

let deg_hr = 0;
let deg_min = 0;
let deg_sec = 0;
let intervalSec = 1000;
let secondsInterval, minutesInterval, hoursInterval;

// Initialize the clock to the current time
function initializeClock() {
    const now = new Date();
    deg_sec = now.getSeconds() * 6;
    deg_min = now.getMinutes() * 6 + now.getSeconds() * 0.1;
    deg_hr = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;

    updateClock();
}

// Rotate the hands visually
function updateClock() {
    sec.style.transform = `rotate(${deg_sec}deg)`;
    min.style.transform = `rotate(${deg_min}deg)`;
    hr.style.transform = `rotate(${deg_hr}deg)`;
}

// Start ticking
function startClock() {
    clearIntervals();

    secondsInterval = setInterval(() => {
        deg_sec += 6;
        deg_min += 0.1;  // 0.1 deg every second
        deg_hr += 1 / 120;  // 0.5 deg every minute = 1/120 deg per second
        updateClock();
    }, intervalSec);
}

// Clear all intervals
function clearIntervals() {
    clearInterval(secondsInterval);
    clearInterval(minutesInterval);
    clearInterval(hoursInterval);
}

// Reset function
function reset() {
    deg_hr = 0;
    deg_min = 0;
    deg_sec = 0;
    initializeClock();
    intervalSec = 1000; // reset speed to default
    startClock();
}

// Speed up
function faster() {
    intervalSec = Math.max(10, intervalSec / 2); // minimum speed cap
    startClock();
}

// Slow down
function slower() {
    intervalSec *= 2;
    startClock();
}

// Set time manually from input
function setTIme() {
    const input = document.querySelector('.set-time').value; // format: "HH:MM"
    if (!input) return;

    const [hoursStr, minutesStr] = input.split(':');
    const hours = parseInt(hoursStr);
    const minutes = parseInt(minutesStr);

    deg_sec = 0;
    deg_min = minutes * 6;
    deg_hr = (hours % 12) * 30 + minutes * 0.5;
    updateClock();
}

function setDate(){
    const today = new Date();
    const dayNo = today.getDay();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const day=days[dayNo];
    const date = today.getDate();
    const monthNo = today.getMonth() ;
    const month = months[monthNo];
    const DATA = `${day} ${date}, ${month}`;
    TODAY.innerHTML = DATA;
    console.log(day, date, month);

    
}


// Start everything
initializeClock();
startClock();
setDate();
