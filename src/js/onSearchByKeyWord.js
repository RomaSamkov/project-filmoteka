import { refs } from './refs';
import { filmsForUser } from './api';

const userFilms = new filmsForUser();

const onSearch = ev => {
  ev.preventDefault();
  refs.galleryContainer.innerHTML = '';
  userFilms.searchFilm = ev.target.elements.searchQuery.value.trim();
  if (!userFilms.searchFilm) {
    userFilms.resetPage();
    userFilms.getTrendingFilm().then(response => console.log('рисуем разметку'));
    return;
  }
  userFilms.resetPage();
  userFilms
    .onSearchFilm()
    .then(response => console.log('Рисуем разметку'))
    .catch(error => console.log('Error'));
};

refs.formSearch.addEventListener('submit', onSearch);
