import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_L29djGtv1lF0NT0mClRarkdoGhfH7equBm4KwTFWhcS1rHpMlFAKS7AuvFIOg9PB';

export function fetchBreeds() {
  const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1',
    timeout: 1000,
  });
  return instance
    .get('/breeds')
    .then(response => {
      if (!response.ok) {
        return response.data;
      }
    })
    .catch(error => {
      console.log(error);
      return error;
    });
}
