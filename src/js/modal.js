
import { refs } from './refs';



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
    
    
