
import { refs } from './refs';
import {userFilms} from './api';



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
    
        // функция рендера
});

};

function oncloseModal() {
    window.removeEventListener('keydown', onEscKeyPress)
    refs.backdrop.classList.add('is-hidden')
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
    
    
