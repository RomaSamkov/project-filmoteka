
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
    };
    refs.backdrop.classList.remove('is-hidden');
    window.addEventListener('keydown', onEscKeyPress);

    userFilms.setId(e.target.dataset.id);
    
    userFilms.onSearchById().then(respons => {
        console.log(respons)
        
    const markup = renderSelectedFilm(respons)
    refs.modalContainer.insertAdjacentHTML('afterbegin', markup);

    })

};

function oncloseModal() {
    window.removeEventListener('keydown', onEscKeyPress)
    refs.backdrop.classList.add('is-hidden')
    refs.modalContainer.innerHTML = "";

};


function onClickBackdrop(e) {
    if (e.currentTarget === e.target) {
        
         oncloseModal()
    };
};

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
    oncloseModal()
    
    };
};
    

function renderSelectedFilm(film) {

    const { original_title, poster_path, genres, vote_average,vote_count,popularity, overview, id } = film;
   return  `
<div class="modal-wrap">
  <img data-id=${id} width="50px" src="${IMG_URL}${poster_path}" alt="${original_title}" loading="lazy" class="modal-image
"/>
  <div class="modal-info">
    <h2 class="modal__title">${original_title}</h2>
    <ul class="modal-list">
      <li class="modal-item">
        Vote / Votes <span class="modal-value">${vote_average} / ${vote_count}</span>
      </li>
      <li class="modal-item">Popularity <span class="modal-value">${popularity}</span></li>
      <li class="modal-item">Original Title <span class="modal-value">${original_title}</span></li>
      <li class="modal-item">Genre <span class="modal-value">${genres.name}</span></li>
    </ul>
    <h3 class="modal-about">ABUOT</h3>
    <p class="modal-description">${overview}</p>
  </div>
</div>
        `;
}

