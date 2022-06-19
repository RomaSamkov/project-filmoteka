import Notiflix from 'notiflix';
import { refs } from './refs';
import { userFilms } from './api';
import { validationSearchedArray } from './onSearchByKeyWord';
import createPagination from './pagination';
import renderTrendsOnMain from './renderTrendsOnMain';
import toggleDragonSpiner from './spiner';
import renderWatchedMovies from './my-library/renderMyLibraryMovies';

export default function renderCardsAndPagination() {
  refs.filmsContainer.innerHTML = '';
  if (userFilms.userSearch) {
    toggleDragonSpiner();
    userFilms
      .onSearchFilm()
      .then(({ results, page, total_pages }) => {
        setTimeout(() => {
          if (validationSearchedArray(results)) return;
          renderTrendsOnMain(results);
          createPagination(page, total_pages);
          toggleDragonSpiner();
        }, 1000);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  } else {
    toggleDragonSpiner();
    userFilms
      .getTrendingFilm()
      .then(({ results, page, total_pages }) => {
        setTimeout(() => {
          renderTrendsOnMain(results);
          createPagination(page, total_pages);
          toggleDragonSpiner();
        }, 1000);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  }
}
