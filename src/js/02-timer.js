import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timer = document.querySelector('.timer');
const startBtn = document.querySelector('button[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() > selectedDates[0]) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
     startBtn.disabled = false;
    }
  },
};

const inputFlatpickr = new flatpickr(inputDate, options);

startBtn.disabled = true;

startBtn.addEventListener('click', onStartTimer);

function onStartTimer() {
  startBtn.disabled = true;
  const timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = inputFlatpickr.selectedDates[0] - currentTime;
    const time = convertMs(deltaTime);

    if (deltaTime < 0) {
      Notiflix.Notify.warning("Time is up");
      clearInterval(timerId);
      return;
    }
    updateClock(time);
  }, 1000);
};

function updateClock({ days, hours, minutes, seconds }) {
  daysOutput.textContent = formatOutput(days);
  hoursOutput.textContent = formatOutput(hours);
  minutesOutput.textContent = formatOutput(minutes);
  secondsOutput.textContent = formatOutput(seconds);
}

function formatOutput(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


// styles

timer.style.display = 'flex';
timer.style.gap = '10px';

daysOutput.style.display = 'flex';
daysOutput.style.justifyContent = 'center';
daysOutput.style.fontSize = '25px';


hoursOutput.style.display = 'flex';
hoursOutput.style.justifyContent = 'center';
hoursOutput.style.fontSize = '25px';


minutesOutput.style.display = 'flex';
minutesOutput.style.justifyContent = 'center';
minutesOutput.style.fontSize = '25px';


secondsOutput.style.display = 'flex';
secondsOutput.style.justifyContent = 'center';
secondsOutput.style.fontSize = '25px';





