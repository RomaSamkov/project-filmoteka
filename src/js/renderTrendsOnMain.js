import { refs } from './refs';
import { IMG_URL } from './api';
import { API_KEY } from './api';
import createPagination from './pagination';
import {userFilms} from './api';

userFilms.getTrendingFilm().then(({ results, page, total_pages }) => {
  renderTrendsOnMain(results);
  createPagination(page, total_pages);
});

export default function renderTrendsOnMain(films) {
  const murkup = films
    .map(film => {
      const { original_title, poster_path, genre_ids, release_date, id } = film;
      if (poster_path === null) return;
      return `
      <li class="filmCard__wrap">
          <img data-id=${id} src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="film__image"/>
          <div class="info">
        <h2 class="info__title">${original_title}</h2>
        <div class="info__wrap">
          <p class="info__genre">genre</p>
          <div class="stick"></div>
          <p class="info__releaseDate">${release_date}</p>
        </div>
        </div>
      </li>
        `;
    })
    .join('');

  refs.filmsContainer.insertAdjacentHTML('beforeend', murkup);
}
