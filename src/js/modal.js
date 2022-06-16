import { refs } from './refs';
import { userFilms } from './api';
import { IMG_URL } from './api';

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

  userFilms.setId(e.target.dataset.id);

  const contentTrailer = document.getElementById('overlay-id');
  const closeBtnTrailer = document.querySelector('.closebtn');
  const clickTrailerOverlay = document.querySelector('.overlay');

  function onOpenTrailer() {
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
  }

  userFilms.onSearchById().then(respons => {
    const markup = renderSelectedFilm(respons);
    refs.modalContainer.insertAdjacentHTML('afterbegin', markup);
    refs.scrollOnModal.classList.toggle('scroll-blocked');

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

      if (moviesId.includes(respons.id)) return;
      watchedMovies.push(respons);
      localStorage.setItem(key, JSON.stringify(watchedMovies));
    }

    function onQueueBtnClick() {
      const key = 'queue';
      const queueMovies = addToQueueStorage();
      const moviesId = queueMovies.map(item => item.id);

      if (moviesId.includes(respons.id)) return;
      queueMovies.push(respons);
      localStorage.setItem(key, JSON.stringify(queueMovies));
    }
    refs.scrollOnModal.classList.toggle('scroll-blocked');
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
      <button data-id="${id}" class="modal-button carrent-btn js-watched-btn">add to Watched</button>
      <button data-id="${id}" class="modal-button js-queue-btn">add to queue</button>
    </div>
    <button class="trailer" id="${id}">
      Trailer
    </button>
  </div>
</div>
        `;
}

function onClickModalBtn(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  const carrentBtn = document.querySelector('.carrent-btn');
  if (carrentBtn) {
    e.target.classList.remove('carrent-btn');
  }
  e.target.classList.toggle('carrent-btn');
}
