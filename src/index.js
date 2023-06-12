import { fetchCatByBreed, fetchBreeds } from './cat-api';
import Notiflix from 'notiflix';

const breedSelectRef = document.querySelector('.breed-select');
const catInfoRef = document.querySelector('.cat-info');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');

loaderRef.classList.add('js-hidden');
errorRef.classList.add('js-hidden');
catInfoRef.classList.add('js-hidden');
let breedId = '';

breedSelectRef.addEventListener('change', showCatByBreed);

showBreeds();

function showCatByBreed(event) {
  hideCatInfo();
  breedId = event.target.value;

  fetchCatByBreed(breedId)
    .then(markupCurrentBreed)
    .catch(error => {
      // loaderRef.classList.add('js-hidden');
      Notiflix.Loading.remove();
      errorNotiflix();
    });
}

function showBreeds() {
  hideCatInfo();

  fetchBreeds()
    .then(markupBreedsSelect)
    .catch(error => {
      // loaderRef.classList.add('js-hidden');
      Notiflix.Loading.remove();
      errorNotiflix();
    });
}

function errorNotiflix() {
  Notiflix.Notify.failure(
    `Oops! Something went wrong! Try reloading the page!`,
    {
      clickToClose: true,
      timeout: 4000,
    }
  );
}

function markupCurrentBreed(data) {
  const markup = el => {
    return `
 <img class="cat-img" src="${el.url}" alt="${el.breeds[0].name}" >
 <div class="cat-text">
 <h1 class="cat-header">${el.breeds[0].name}</h1>
 <p>${el.breeds[0].description}</p>
 <p><span><b>Temperament: </b></span>${el.breeds[0].temperament}</p>
 </div>`;
  };

  catInfoRef.innerHTML = markup(data[0]);
  // loaderRef.classList.add('js-hidden');
  Notiflix.Loading.remove();
  catInfoRef.classList.remove('js-hidden');
}

function markupBreedsSelect(data) {
  const markup = data
    .map(el => {
      breedId = el.id;
      return `<option value=${el.id}>${el.name}</option>`;
    })
    .join('');
  breedSelectRef.insertAdjacentHTML('beforeend', markup);
  // loaderRef.classList.add('js-hidden');
  Notiflix.Loading.remove();
}

function hideCatInfo() {
  if (!catInfoRef.classList.contains('js-hidden')) {
    catInfoRef.classList.add('js-hidden');
  }
  // loaderRef.classList.remove('js-hidden');
  Notiflix.Loading.circle('Loading data, please wait...');
}
