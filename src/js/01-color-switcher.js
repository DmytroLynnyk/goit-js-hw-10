const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

let change;

function onStart() {
  let currentColor;
  const newColor = setInterval(() => {
    currentColor = getRandomHexColor();
    body.style.backgroundColor = currentColor;
  }, 1000);
  change = newColor;
  currentColor = getRandomHexColor();
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled', 'true');
}

function onStop() {
  clearInterval(change);
  startBtn.removeAttribute('disabled', 'true');
  stopBtn.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
