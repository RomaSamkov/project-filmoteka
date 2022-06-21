import { refs } from '../refs';
import movieTemplate from '../movieTamplate';


function renderWatchedMovies() {
  const films = JSON.parse(localStorage.getItem('watched'));

  if (!films || films.length === 0) {
    const item = `
    <li class="no-results">
      <p class="library-text">Your collection list is empty.</p>
      <img src='https://i.gifer.com/4m3f.gif' alt="No results" width= "100" class="img_r"/>
    </li>`;
    refs.filmsContainer.innerHTML = item;

  } else {
    const markup = films.map(movieTemplate);
    refs.filmsContainer.innerHTML = markup.join('');
  }
  
  localStorage.setItem('library', 'watched');
};

function renderQueueMovies() {
  const films = JSON.parse(localStorage.getItem('queue'));

  if (!films || !films.length) {
    const item = `
    <li class="no-results">
      <p class="library-text">Your collection list is empty.</p>
      <img src='https://i.gifer.com/4m3f.gif' alt="No results" width= "100" class="img_r"/>
    </li>`;
    refs.filmsContainer.innerHTML = item;

  } else {
    const markup = films.map(movieTemplate);
    refs.filmsContainer.innerHTML = markup.join('');
  }

  localStorage.setItem('library', 'queue');
};

export { renderWatchedMovies, renderQueueMovies };
