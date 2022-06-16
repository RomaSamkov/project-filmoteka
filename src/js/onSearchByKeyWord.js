import Notiflix from 'notiflix';
import { refs } from './refs';
import { userFilms } from './api';
import renderTrendsOnMain from './renderTrendsOnMain';
import createPagination from './pagination';

const onSearch = ev => {
  ev.preventDefault();
  refs.filmsContainer.innerHTML = '';
  userFilms.searchFilm = ev.target.elements.searchQuery.value.trim();
  userFilms.resetPage();
  renderCardsAndPagination();
};

refs.formSearch.addEventListener('submit', onSearch);

export default function renderCardsAndPagination() {
  refs.filmsContainer.innerHTML = '';
  if (userFilms.userSearch) {
    userFilms
      .onSearchFilm()
      .then(({ results, page, total_pages }) => {
        if (validationSearchedArray(results)) return;
        renderTrendsOnMain(results);
        createPagination(page, total_pages);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  } else {
    userFilms
      .getTrendingFilm()
      .then(({ results, page, total_pages }) => {
        renderTrendsOnMain(results);
        createPagination(page, total_pages);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  }
}

const validationSearchedArray = results => {
  if (results.length === 0) {
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
