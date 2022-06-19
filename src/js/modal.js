import { refs } from './refs';
import { userFilms } from './api';
import { IMG_URL } from './api';
import { renderWatchedMovies, renderQueueMovies } from './my-library/renderMyLibraryMovies';

refs.closeModalBtn.addEventListener('click', oncloseModal);
refs.backdrop.addEventListener('click', onClickBackdrop);
refs.filmsContainer.addEventListener('click', onOpenModal);

function onOpenModal(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  refs.backdrop.classList.remove('is-hidden');
  window.addEventListener('keydown', onEscKeyPress);
  refs.scrollOnModal.classList.toggle('scroll-blocked');

  userFilms.setId(e.target.dataset.id);

  const contentTrailer = document.getElementById('overlay-id');
  const closeBtnTrailer = document.querySelector('.closebtn');
  const clickTrailerOverlay = document.querySelector('.overlay');

  function onOpenTrailer() {
    window.addEventListener('keydown', onEscKeyPressTrailer);
    userFilms.onSearchTrailerById().then(videoData => {
      let key = '';
      videoData.results.map(video => {
        if (video.name.includes('Official')) {
          key = video.key;
        }
      });
      iframeRender(key);
    });
    document.getElementById('myNav').style.width = '100%';
  }

  closeBtnTrailer.addEventListener('click', () => {
    onCloseTrailer();
  });

  function iframeRender(key) {
    const BASE_YOUTUBE_URL = 'https://www.youtube.com/embed/';
    contentTrailer.innerHTML = `<iframe
       src="${BASE_YOUTUBE_URL}${key}?autoplay=0&mute=0&controls=1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
       </iframe>
     `;
    clickTrailerOverlay.addEventListener('click', () => {
      onCloseTrailer();
    });
  }

  function onCloseTrailer() {
    document.getElementById('myNav').style.width = '0%';
    contentTrailer.innerHTML = '';
  }

  function onEscKeyPressTrailer(e) {
    if (e.code === 'Escape') {
      document.getElementById('myNav').style.width = '0%';
      contentTrailer.innerHTML = '';
    }
  }

  userFilms.onSearchById().then(respons => {
    const markup = renderSelectedFilm(respons);
    refs.modalContainer.insertAdjacentHTML('afterbegin', markup);
    const trailer = document.querySelector('.trailer');
    trailer.addEventListener('click', () => {
      onOpenTrailer();
    });

    refs.modalContainer
      .querySelector('.js-watched-btn')
      .addEventListener('click', onWatchedBtnClick);
    refs.modalContainer.querySelector('.js-queue-btn').addEventListener('click', onQueueBtnClick);

    function onWatchedBtnClick() {
      const key = 'watched';
      const watchedMovies = addToWatchedStorage();
      const moviesId = watchedMovies.map(item => item.id);
      const indexFilmWatched = moviesId.indexOf(respons.id)
      let storWatchedBox = JSON.parse(localStorage.getItem('watched'));

      if (moviesId.includes(respons.id)) {
        storWatchedBox.splice(indexFilmWatched, 1)
        localStorage.setItem(key, JSON.stringify(storWatchedBox));
        renderWatchedMovies()
      } else {

        watchedMovies.push(respons);
        localStorage.setItem(key, JSON.stringify(watchedMovies));
        renderWatchedMovies()
      }
    }

    function onQueueBtnClick() {
      const key = 'queue';
      const queueMovies = addToQueueStorage();
      const moviesId = queueMovies.map(item => item.id);
      const indexFilmQueue = moviesId.indexOf(respons.id);
      let storQueueBox = JSON.parse(localStorage.getItem('queue'));

      if (moviesId.includes(respons.id)) {
        storQueueBox.splice(indexFilmQueue, 1)
        localStorage.setItem(key, JSON.stringify(storQueueBox));
        renderQueueMovies();
      } else {
        queueMovies.push(respons);
        localStorage.setItem(key, JSON.stringify(queueMovies));
        renderQueueMovies();
      }
    }
  });
}

function addToWatchedStorage() {
  const data = JSON.parse(localStorage.getItem('watched'));
  if (data) {
    return [...data];
  }
  return [];
}
function addToQueueStorage() {
  const data = JSON.parse(localStorage.getItem('queue'));
  if (data) {
    return [...data];
  }
  return [];
}

function oncloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdrop.classList.add('is-hidden');
  refs.modalContainer.innerHTML = '';
  refs.scrollOnModal.classList.toggle('scroll-blocked');
}

function onClickBackdrop(e) {
  if (e.currentTarget === e.target) {
    oncloseModal();
  }
}

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    oncloseModal();
  }
}

function renderSelectedFilm(film) {
  const {
    original_title,
    poster_path,
    genres,
    vote_average,
    vote_count,
    popularity,
    overview,
    id,
  } = film;
  return `
<div class="modal-wrap">
  <div class="wrap-img">
  <button class="trailer" id="${id}">
      &#x25BA;
    </button>
    <img
      data-id="${id}"
      src="${IMG_URL}${poster_path}"
      alt="${original_title}"
      loading="lazy"
      class="modal-image"
    />
  </div>
  <div class="box-info">
    <div class="modal-info">
      <h2 class="modal-title">${original_title}</h2>
      <div class="modal-box-list">
       <ul class="list-modal list">
         <li class="list-item">
            <span class="item-name">Vote/Votes</span>
           <span class="item-value">
           <div class="item-activ-carrent">
           <span class="selection-item">${vote_average}</span></div>/${vote_count}</span>
         </li>
         <li class="list-item">
           <span class="item-name">Popularity</span>
           <span class="item-value">${popularity}</span>
         </li>
         <li class="list-item">
          <span class="item-name">Original Title</span>
          <span class="item-value uppercase">${original_title}</span>
        </li>
        <li class="list-item">
         <span class="item-name">Genre</span>
         <span class="item-value">${genres.map(g => ' ' + g.name)}</span>
      </li>
    </ul>
      </div>
       <div class="box-description">
        <h3 class="title-about">ABOUT</h3>
        <p class="modal-description">${overview}</p>
      </div>
    </div>
    <div class="modal-button-list">
      <button data-id="${id}" class="modal-button js-watched-btn">Add to Watched</button>
      <button data-id="${id}" class="modal-button js-queue-btn">Add to Queue</button>
    </div>
      </div>
</div>
        `;
}
