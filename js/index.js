let countdown = 0; // variable to set/clear intervals
let seconds = 1500; // seconds left on the clock
let isBreak = true;
let isPaused = true;

const status = document.querySelector("#status");
const timerDisplay = document.querySelector(".timerDisplay");
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset");
const workMin = document.querySelector("#work-min");
const breakMin = document.querySelector("#break-min");

let x = parseInt(workMin.textContent);  // Work duration
let y = parseInt(breakMin.textContent);  // Break duration

const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");


/* EVENT LISTENERS FOR START AND RESET BUTTONS */
startBtn.addEventListener('click', () => {
  clearInterval(countdown);
  if (isPaused) {
    countdown = setInterval(timer, 1000);
    isPaused = false;
  } else {
    isPaused = true;
  }
})

resetBtn.addEventListener('click', () => {
  clearInterval(countdown);
  seconds = x * 60;
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

    if (isBreak) {
      seconds = y * 60;
      isBreak = false;
    } else {
      seconds = x * 60;
      isBreak = true;
    }
  }
}


/* UPDATE WORK AND BREAK TIMES */
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
  isBreak ? status.textContent = "Keep Working" : status.textContent = "Take a Break!";

  if (isPaused && countdown === 0) {
    startBtn.textContent = "START";
  } else if (isPaused && countdown !== 0) {
    startBtn.textContent = "Continue";
  } else {
    startBtn.textContent = "Pause";
  }

  workMin.textContent = x;
  breakMin.textContent = y;

  // Updates countdown display
  let minutes = Math.floor(seconds / 60);
  let remainderSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
}, 100);
