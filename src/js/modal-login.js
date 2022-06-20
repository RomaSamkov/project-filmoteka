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

onAuthStateChanged(auth, (user) => {  
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
})

function onOpenLoginModal() {
  if (userSignedIn) {
    
    return
   }
    else {
    refs.backdropLogin.classList.remove('is-hidden');
    window.addEventListener('keydown', onEscKeyPress);
    refs.scrollOnModal.classList.toggle('scroll-blocked');
   }
}

///----------Eyes--------------

const inputChangeReg = document.querySelector('#regPassword');
const inputChangeLog = document.querySelector('#logPassword');

const btnRegChangePassword = document.querySelector('.regChangeBtn');
const btnLogChangePassword = document.querySelector('.logChangeBtn');

btnRegChangePassword.addEventListener('click', changePasswordInRegInput);
btnLogChangePassword.addEventListener('click', changePasswordInLogInput);

function changePasswordInRegInput() {
  if (inputChangeReg.getAttribute('type') == 'password') {
    btnRegChangePassword.classList.add('closedEye');
    btnRegChangePassword.classList.remove('openEye');
    inputChangeReg.setAttribute('type', 'text');
  } else {
    btnRegChangePassword.classList.remove('closedEye');
    btnRegChangePassword.classList.add('openEye');
    inputChangeReg.setAttribute('type', 'password');
  }
  return false;
}
function changePasswordInLogInput() {
  if (inputChangeLog.getAttribute('type') == 'password') {
    btnLogChangePassword.classList.add('closedEye');
    btnLogChangePassword.classList.remove('openEye');
    inputChangeLog.setAttribute('type', 'text');
  } else {
    btnLogChangePassword.classList.remove('closedEye');
    btnLogChangePassword.classList.add('openEye');
    inputChangeLog.setAttribute('type', 'password');
  }
  return false;
}