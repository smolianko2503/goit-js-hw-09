
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

let timerId = null;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

stopBtn.disabled = true;

function onStart() {
  timerId = setInterval(() => {
      body.style.background = getRandomHexColor(); 
      startBtn.disabled = true;
      stopBtn.disabled = false;
     }, 1000)
};

function onStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerId);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};




