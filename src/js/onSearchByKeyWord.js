import Notiflix from 'notiflix';
import { refs } from './refs';
import renderTrendsOnMain from './renderTrendsOnMain';
import ApiServise from './api';

const userFilms = new ApiServise();

const onSearch = ev => {
  ev.preventDefault();
  refs.galleryContainer.innerHTML = '';
  userFilms.searchFilm = ev.target.elements.searchQuery.value.trim();
  if (!userFilms.searchFilm) {
    userFilms.resetPage();
    Notiflix.Notify.warning('Please, enter something for search!');
    // userFilms.getTrendingFilm().then(response => рисуем разметку);
    return;
  }
  userFilms.resetPage();
  userFilms
    .onSearchFilm()
    .then(response => console.log('Рисуем разметку'))
    .catch(error => Notiflix.Notify.failure('Error!'));
};

refs.formSearch.addEventListener('submit', onSearch);
