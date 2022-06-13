
import { refs } from './refs';



refs.closeModalBtn.addEventListener('click', oncloseModal);
refs.backdrop.addEventListener('click', onClickBackdrop);

window.addEventListener('keydown', onEscKeyPress); //повесить этот слушатель на открытие модалки чтобы он работал только при открытой

function onOpenModal() {

    
    
}

function oncloseModal() {
    window.removeEventListener('keydown', onEscKeyPress)
    refs.backdrop.classList.add('is-hidden')
};


function onClickBackdrop(e) {
    if (e.currentTarget === e.target) {
        
         oncloseModal()
    }
};

function onEscKeyPress(e) {
    if (e.code === 'Escape') {
    oncloseModal()
    
    }
}
    
    
