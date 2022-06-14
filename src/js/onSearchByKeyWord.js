import Notiflix from 'notiflix';
import { refs } from './refs';
import { userFilms } from './api';
import renderTrendsOnMain from './renderTrendsOnMain';

const onSearch = ev => {
  ev.preventDefault();
  refs.filmsContainer.innerHTML = '';
  userFilms.searchFilm = ev.target.elements.searchQuery.value.trim();
  if (!userFilms.searchFilm) {
    userFilms.getTrendingFilm().then(response => renderTrendsOnMain(response.results));
    Notiflix.Notify.warning('Please, enter something for search!');
    return;
  }
  userFilms.resetPage();
  userFilms
    .onSearchFilm()
    .then(response => {
      if (validationSearchedArray(response)) {
        return;
      }
      renderTrendsOnMain(response.results);
    })
    .catch(error => Notiflix.Notify.failure('Error!'));
};

const validationSearchedArray = response => {
  if (response.results.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no videos matching your search query. Please try again.',
    );
    refs.filmsContainer.insertAdjacentHTML('beforeend', renderNotResults());
    return;
  }
};

function renderNotResults() {
  return `<li><img src="./images/Z60B.gif" alt="No results" width= "70" class="photo"/></li>`;
}

refs.formSearch.addEventListener('submit', onSearch);
