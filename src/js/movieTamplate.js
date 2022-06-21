import { IMG_URL } from './api';
import { userFilms } from './api';
import genres from './genres.json';

function movieTemplate(film) {
  const { original_title, poster_path, genre_ids, release_date, id, vote_average } = film;
  if (!poster_path) return;

  if (genre_ids) {
    const genreArray = genre_ids.reduce((acc, id, index) => {
      if (index > 2) {
        return acc;
      } else if (index > 1) {
        return acc + ' Others';
      } else {
        const str = genres.filter(genre => genre.id === id).map(genre => genre.name);

        return acc + ' ' + str;
      }
    }, '');

    const shortList = genreArray.trim().split(' ').join(', ');
    let date = '';
    if(release_date){
      date = release_date.slice(0, 4);
    }

    return `
        <li class="filmCard__wrap">
            <img data-id="${id}" src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="film__image"/>
            <div class="info">
                <h2 class="info__title">${original_title}</h2>
                <div class="info__wrap">
                    <p class="info__genre"> ${shortList} | ${date} </p>
                    <div class="info__voteAverage"> 
                        <span class="info_voteValue"> ${vote_average} </span>
                    </div>
                </div>
            </div>
        </li>
        `;
  } else {
    let shortList = '';
    if (film.genres.length === 0) {
      shortList = 'Unknown genre';
    } else {
      shortList = film.genres
        .map(genre => genre.name)
        .reduce((acc, g, i) => {
          if (i > 2) {
            return acc;
          } else if (i > 1) {
            return acc + ', Others';
          }
          return acc + ', ' + g;
        });
    }
    let date = '';
    if(release_date){
      date = release_date.slice(0, 4);
    }
    return `
        <li class="filmCard__wrap">
            <img data-id="${id}" src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="film__image"/>
            <div class="info">
                <h2 class="info__title">${original_title}</h2>
                <div class="info__wrap">
                    <p class="info__genre"> ${shortList} | ${date} </p>
                    <div class="info__voteAverage"> 
                        <span class="info_voteValue"> ${vote_average} </span>
                    </div>
                </div>
            </div>
        </li>
        `;
  }
}

export default movieTemplate;
