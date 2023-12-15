import { fetchBreeds } from './cat-api';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', onChange);
loader.hidden = false;
error.hidden = true;
select.style.width = '250px';

fetchBreeds()
  .then(response => {
    loader.hedden = true;
    renderSelected(response);
  })
  .catch(() => {
    error.hidden = false;
    select.hidden = true;
  });
