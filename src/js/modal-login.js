import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { refs } from './refs';

refs.closeLoginModalBtn.addEventListener('click', oncloseModal);
refs.backdropLogin.addEventListener('click', onClickBackdrop);
refs.openLoginModalBtn.addEventListener('click', onOpenLoginModal);

function oncloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.backdropLogin.classList.add('is-hidden');
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

const auth = getAuth();
var userSignedIn;

onAuthStateChanged(auth, user => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    userSignedIn = true;
    return userSignedIn;
    //alert('User is signed in')
    // ...
  } else {
    userSignedIn = false;
    return userSignedIn;
    // User is signed out
    // ...
    //var userSignedIn = false;
  }
});

function onOpenLoginModal() {
  if (userSignedIn) {
    return;
  } else {
    refs.backdropLogin.classList.remove('is-hidden');
    window.addEventListener('keydown', onEscKeyPress);
    refs.scrollOnModal.classList.toggle('scroll-blocked');
  }
}
