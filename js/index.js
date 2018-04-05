let countdown = 0; // variable to set/clear intervals
let seconds = 1500; // seconds left on the clock
let workDuration = 25;
let breakDuration = 5;
let isBreak = true;
let isPaused = true;

const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* EVENT LISTENERS FOR START AND RESET BUTTONS */
startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  isPaused = !isPaused;
  if (!isPaused) {
    countdown = setInterval(timer, 1000);
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = workDuration * 60;
  countdown = 0;
  isPaused = true;
  isBreak = true;
})

/* TIMER - HANDLES COUNTDOWN */
function timer() {
  seconds --;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();
    seconds = (isBreak ? breakDuration : workDuration) * 60;
    isBreak = !isBreak;
  }
}


/* UPDATE WORK AND BREAK TIMES */
let increment = 5;

document.querySelector("#work-plus").onclick = function() {
  workDuration < 60 ? workDuration += increment : workDuration;
}
document.querySelector("#work-minus").onclick = function() {
  workDuration > 5 ? workDuration -= increment : workDuration;
}
document.querySelector("#break-plus").onclick = function() {
  breakDuration < 60 ? breakDuration += increment : breakDuration;
}
document.querySelector("#break-minus").onclick = function() {
  breakDuration > 5 ? breakDuration -= increment : breakDuration;
}

/* UPDATE HTML CONTENT */
function countdownDisplay() {
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}

function buttonDisplay() {
  if (isPaused && countdown === 0) {
    startBtn.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue";
  } else {
    startBtn.textContent = "Pause";
  }
}

function updateHTML() {
  countdownDisplay();
  buttonDisplay();
  isBreak ? status.textContent = "Keep Working" : status.textContent = "Take a Break!";
  workMin.textContent = workDuration;
  breakMin.textContent = breakDuration;
}

document.onclick = function() {
  window.setInterval(updateHTML, 100);
}
