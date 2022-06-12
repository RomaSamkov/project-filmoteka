import { refs } from './refs';
import ApiServise from './api';
import { IMG_URL } from './api';
import { API_KEY } from './api';

const userFilms = new ApiServise();

userFilms.getTrendingFilm().then(renderTrendsOnMain);

export default function renderTrendsOnMain(films) {
  console.log(films.results);
  const murkup = films.results
    .map(film => {
      const { original_title, poster_path, genre_ids, release_date, id } = film;
      return `
        <a class="film__link" href="https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}"><img src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="film__image"/></a>
      
      <div class="info">
        <h2 class="info__title">${original_title}</h2>
        <div class="info__wrap">
         {{#each genre_ids}}
             <p class="info__title info__description">{{this}}</p>
         {{/each}}
          <p class="info__title info__description">${release_date}</p>
        </div>
      </div>

     </a>
        `;
    })
    .join('');

  refs.filmsContainer.insertAdjacentHTML('beforeend', murkup);
}
