import { refs } from './refs';
import createPagination from './pagination';
import { userFilms } from './api';
import toggleDragonSpiner from './spiner';
import movieTemplate from './movieTamplate';

toggleDragonSpiner();
userFilms.getTrendingFilm().then(({ results, page, total_pages }) => {
  setTimeout(() => {
    renderTrendsOnMain(results);
    createPagination(page, total_pages);
    toggleDragonSpiner();
  }, 1000);
});

export default function renderTrendsOnMain(films) {
  const murkup = films.map(movieTemplate);

  refs.filmsContainer.insertAdjacentHTML('beforeend', murkup.join(''));
};

