import Notiflix from 'notiflix';
import { refs } from './refs';
import renderTrendsOnMain from './renderTrendsOnMain';
import ApiServise from './api';

const userFilms = new ApiServise();

const onSearch = ev => {
  ev.preventDefault();
  refs.filmsContainer.innerHTML = '';
  userFilms.searchFilm = ev.target.elements.searchQuery.value.trim();
  if (!userFilms.searchFilm) {
    userFilms.getTrendingFilm().then(response => renderTrendsOnMain(response));
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
      renderTrendsOnMain(response);
    })
    .catch(error => Notiflix.Notify.failure('Error!'));
};

const validationSearchedArray = response => {
  if (response.results.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    refs.filmsContainer.insertAdjacentHTML('beforeend', renderNotResults());
    return;
  }
};

function renderNotResults() {
  return `<li><img src="../images/not-video.png" alt="No results" width= "70"/></li>`;
}

refs.formSearch.addEventListener('submit', onSearch);
