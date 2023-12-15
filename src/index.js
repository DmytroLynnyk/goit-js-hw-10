import { fetchBreeds } from './cat-api';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

loader.hidden = false;
error.hidden = true;
select.style.width = '180px';
// select.addEventListener('change', onChange);

function renderOptions(response) {
  const options = response.map(({ id, name }) => {
    return `<option value = "${id}" class="js-option">${name}</option>`;
  });
  options.unshift(
    '<option value="" disabled selected>Оберіть породу кішки...</option>'
  );
  return (select.innerHTML = options.join(''));
}

fetchBreeds()
  .then(response => {
    loader.hedden = true;
    renderOptions(response);
  })
  .catch(() => {
    error.hidden = false;
    select.hidden = true;
  });
