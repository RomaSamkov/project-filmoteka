import { refs } from './refs';

refs.footerCloseModalBtn.addEventListener('click', onCloseFooterModal);
refs.footerLink.addEventListener('click', onOpenFooterModal);
refs.footerBackdrop.addEventListener('click', onClickFooterBackdrop);


function onOpenFooterModal(e) {
    e.preventDefault();
    refs.scrollOnModal.classList.add('scroll-hidden')
    refs.footerBackdrop.classList.remove('is-hidden');
    window.addEventListener('keydown', onEscPress);
}

function onCloseFooterModal(e) {
    refs.footerBackdrop.classList.add('is-hidden');
    window.removeEventListener('keydown', onEscPress);
    refs.scrollOnModal.classList.remove('scroll-hidden')
}

function onClickFooterBackdrop(e) {
    if (e.target === e.currentTarget) {

        onCloseFooterModal()
    };
};

function onEscPress(e) {
    if (e.code === 'Escape') {
        onCloseFooterModal()
    }
}