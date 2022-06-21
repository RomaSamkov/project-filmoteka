import Notiflix from 'notiflix';
import { refs } from './refs';
import { userFilms } from './api';
import renderMoviesAndPagination from './renderMoviesAndPagination';



const onSearch = event => {
  event.preventDefault();
  refs.filmsContainer.innerHTML = '';
  const searchQuery = event.target.elements.searchQuery.value.trim();

  localStorage.setItem('search', searchQuery);
  localStorage.setItem('page', 1);
  userFilms.searchFilm = searchQuery;
  
  userFilms.resetPage();
  renderMoviesAndPagination();
  event.currentTarget.reset();
};

refs.formSearch.addEventListener('submit', onSearch);

export const validationSearchedArray = results => {
  if (results.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no videos matching your search query. Please try again.',
    );
    refs.filmsContainer.insertAdjacentHTML('beforeend', renderNotResults());
    return;
  }
};

function renderNotResults() {
  return `<li class="no-results"><img src='https://i.gifer.com/4m3f.gif' alt="No results" width= "100" class="img_r"/></li>`;
}
