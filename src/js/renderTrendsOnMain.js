import { refs } from './refs';
import { IMG_URL } from './api';
import createPagination from './pagination';
import genres from '../js/genres.json';
import {userFilms} from './api';
import toggleDragonSpiner from './spiner';

toggleDragonSpiner();
userFilms.getTrendingFilm().then(({ results, page, total_pages }) => {
  setTimeout(()=>{
    renderTrendsOnMain(results);
    createPagination(page, total_pages);
    toggleDragonSpiner();
  }, 1000)
  
});

export default function renderTrendsOnMain(films) {
  const murkup = films
    .map(film => {
      const { original_title, poster_path, genre_ids, release_date, id, vote_average } = film;
      if (poster_path === null) return;

      const release_year = release_date.slice(0, 4);

      const genreArray = film.genre_ids.reduce((acc, id, index) => {
        let genreToFind = genres.find(genre => genre.id === id);

        if (genreToFind) {
          acc.push(genreToFind.name);
        }
        return acc;
      }, []);

      const shortList = genreArray.slice(0, 2) + ',' + 'Other';
      console.log(shortList);

      return `
        <li class="filmCard__wrap">
        <img data-id="${id}" src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="film__image"/>
        <div class="info">
      <li class="filmCard__wrap">
          <img data-id=${id} src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="film__image"/>
          <div class="info">
        <h2 class="info__title">${original_title}</h2>
        <div class="info__wrap">
          <p class="info__genre"> ${shortList} | ${release_year} </p>
          <div class="info__voteAverage"> <span class="info_voteValue"> ${vote_average} </span></div>
        </div>
        </div>
        </li>
        `;
    })
    .join('');

  refs.filmsContainer.insertAdjacentHTML('beforeend', murkup);
}
