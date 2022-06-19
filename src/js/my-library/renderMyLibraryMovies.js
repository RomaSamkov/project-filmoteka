import { refs } from '../refs';
import movieTemplate from '../movieTamplate';

function renderWatchedMovies() {
  const films = JSON.parse(localStorage.getItem('watched'));

  if (films.length === 0) {
    // const screen = 'src="./images/empty.jpeg"'
    // const markup = `<img ${screen} alt="empty list"><p>Your collection list is empty.</p>`;

    const div = `<div class="film__list-empty-container"><p>Your collection list is empty.</p></div>`;

    refs.filmsContainer.innerHTML = div;
  } else {
    const markup = films.map(movieTemplate);
    refs.filmsContainer.innerHTML = markup.join('');
  }
}

function renderQueueMovies() {
  const films = JSON.parse(localStorage.getItem('queue'));

  if (!films) {
    refs.filmsContainer.innerHTML = '';
  } else {
    const markup = films.map(movieTemplate);
    refs.filmsContainer.innerHTML = markup.join('');
  }
}

export { renderWatchedMovies, renderQueueMovies };
