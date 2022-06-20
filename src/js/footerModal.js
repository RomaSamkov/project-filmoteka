import { refs } from './refs';

refs.footerCloseModalBtn.addEventListener('click', onCloseFooterModal);
refs.footerLink.addEventListener('click', onOpenFooterModal);
refs.footerBackdrop.addEventListener('click', onClickFooterBackdrop);


function onOpenFooterModal(event) {
    event.preventDefault();
    refs.scrollOnModal.classList.add('scroll-hidden')
    refs.footerBackdrop.classList.remove('is-hidden');
    window.addEventListener('keydown', onEscPress);
}

function onCloseFooterModal(event) {
    refs.footerBackdrop.classList.add('is-hidden');
    window.removeEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.remove('scroll-hidden')
}

function onClickFooterBackdrop(event) {
    if (event.target === event.currentTarget) {

        onCloseFooterModal()
    };
};

function onEscPress(event) {
    if (event.code === 'Escape') {
        onCloseFooterModal()
    }
}