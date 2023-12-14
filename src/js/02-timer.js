import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
startBtn.addEventListener('click', onClick);

const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickedDate = pickDate(selectedDates[0]);
    localStorage.setItem('pickedDate', JSON.stringify(pickedDate.getTime()));
  },
};
flatpickr(datetimePicker, options);

function pickDate(selectedDates) {
  const date = new Date().getTime();
  selectedDates.getTime() > date
    ? (startBtn.disabled = false)
    : ((startBtn.disabled = true),
      Notiflix.Notify.failure('Please choose a date in the future'));
  return selectedDates;
}

function onClick() {
  const pickedDate = JSON.parse(localStorage.getItem('pickedDate'));
  startTimer(pickedDate);
  Notiflix.Notify.info('Timer has started');
}

let timeId = null;

function startTimer(pickedDate) {
  createTimer(pickedDate);
  timeId = setInterval(() => {
    createTimer(pickedDate);
  }, 1000);
}

function createTimer(pickedDate) {
  startBtn.disabled = true;
  let currentDate = new Date();
  currentDate = currentDate.getTime();
  const result = pickedDate - currentDate;
  if (result >= 0) {
    const timeLeft = convertMs(result);
    daysLeft.textContent = `${addLeadingZero(timeLeft.days)}`;
    hoursLeft.textContent = `${addLeadingZero(timeLeft.hours)}`;
    minutesLeft.textContent = `${addLeadingZero(timeLeft.minutes)}`;
    secondsLeft.textContent = `${addLeadingZero(timeLeft.seconds)}`;
  } else {
    Notiflix.Notify.success('Timer is over');
    clearInterval(timeId);
  }
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
