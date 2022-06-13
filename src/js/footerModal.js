import { refs } from './refs';

refs.footerCloseModalBtn.addEventListener('click', onCloseFooterModal);
refs.footerLink.addEventListener('click', onOpenFooterModal);
refs.footerBackdrop.addEventListener('click', onClickFooterBackdrop);


function onOpenFooterModal(e) {
    e.preventDefault();
    refs.footerBackdrop.classList.remove('is-hidden');
}

function onCloseFooterModal(e) {
    refs.footerBackdrop.classList.add('is-hidden');
}

function onClickFooterBackdrop(e) {
    if (e.target === e.currentTarget) {

        onCloseFooterModal()
    };
};