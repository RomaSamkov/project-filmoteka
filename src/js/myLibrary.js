import { userFilms } from './api';
import { IMG_URL } from './api';
import { refs } from './refs';

// const fimsLib = document.querySelector('film__list-lib');

const savedFilmWatched = localStorage.getItem("watched");
const parsedFilmWatched = JSON.parse(savedFilmWatched);
console.log(parsedFilmWatched);



// const createGalleryItemMarkup = film => {
//   const { original_title, poster_path, genre_ids, release_date, id } = film;
//   return `
//       <li class="filmCard__wrap">
//           <img data-id=${id} src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="film__image"/>
//           <div class="info">
//         <h2 class="info__title">${film.original_title}</h2>
//         <div class="info__wrap">
//           <p class="info__genre">genre</p>
//           <div class="stick"></div>
//           <p class="info__releaseDate">${release_date}</p>
//         </div>
//         </div>
//       </li>
//         `;
// };

// const galleryAll = parsedFilmWatched.map(createGalleryItemMarkup).join('');

// refs.filmsLibrary.insertAdjacentHTML('afterbegin', galleryAll);
