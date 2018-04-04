let countdown = 0; // variable to set/clear intervals
let seconds = 1500; // seconds left on the clock
let pauseTime = 0; // seconds left when the timer is paused
let isBreak = true;
let isPaused = true;
let statusText;

const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

const workingText = "Keep Working";
const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* EVENT LISTENERS FOR START AND RESET BUTTONS */
startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  if (isPaused) {
    startCountdown();
    startBtn.textContent = "Pause";
    isPaused = false;
  } else {
    pauseTime = seconds;
    startBtn.textContent = "Continue";
    isPaused = true;
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = workMin.textContent * 60;
  countdown = 0;
  pauseTime = 0;
  isPaused = true;
  isBreak = true;
  statusText = "";
  startBtn.textContent = "Start";
})

/* MAIN FUNCTIONS - TIMER, START COUNTDOWN */
function timer() {
  seconds --;
  if (seconds < 0) {
    clearInterval(countdown);
    alarm.currentTime = 0;
    alarm.play();

    if (isBreak) {
      seconds = breakMin.textContent * 60;
      statusText = "Take a Break!";
      isBreak = false;
    } else {
      seconds = workMin.textContent * 60;
      statusText = workingText;
      isBreak = true;
    }
    countdown = setInterval(timer, 1000);
    return;
  }
}

function startCountdown() {
  if (pauseTime != 0) {
    seconds = pauseTime;
  } else {
    seconds = workMin.textContent * 60;
    statusText = workingText;
  }
  countdown = setInterval(timer, 1000);
}

/* UPDATE WORK AND BREAK TIMES */
let x = parseInt(workMin.textContent);
let y = parseInt(breakMin.textContent);

document.querySelector("#work-plus").onclick = function() {
  x < 60 ? x+=5 : x;
}
document.querySelector("#work-minus").onclick = function() {
  x > 5 ? x-=5 : x;
}
document.querySelector("#break-plus").onclick = function() {
  y < 60 ? y+=5 : y;
}
document.querySelector("#break-minus").onclick = function() {
  y > 5 ? y-=5 : y;
}

/* RUNS 10X PER SECOND TO UPDATE HTML CONTENT */
window.setInterval(function() {
  workMin.textContent = x;
  breakMin.textContent = y;
  status.textContent = statusText;
  // Updates countdown display
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}, 100);
