import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, set, ref, update } from 'firebase/database';
import { refs } from './refs';
import Notiflix from 'notiflix';

export const txtEmail = document.querySelector('#txtEmail');
export const txtPassword = document.querySelector('#txtPassword');

const firebaseConfig = {
  apiKey: 'AIzaSyBg_vNQh-ymwUyewu5MxKAEmiok_RoIB6I',
  authDomain: 'filmoteka-project4.firebaseapp.com',
  databaseURL: 'https://filmoteka-project4-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-project4',
  storageBucket: 'filmoteka-project4.appspot.com',
  messagingSenderId: '1092490638254',
  appId: '1:1092490638254:web:3d9c0453d9f23e0d534e3f',
  measurementId: 'G-PYKKCHZD62',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(firebaseApp);

// -----------------Реєстрація----------------------------

regSubmitData.addEventListener('click', e => {
  var email = document.getElementById('regEmail').value;
  var password = document.getElementById('regPassword').value;
  document.getElementById('regEmail').value = '';
  document.getElementById('regPassword').value = '';

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      refs.backdropLogin.classList.add('is-hidden');
      refs.scrollOnModal.classList.toggle('scroll-blocked');
      const user = userCredential.user;
      // ...
      set(ref(database, 'users/' + user.uid), {
        email: regEmail,
        password: regPassword,
      })
        .then(() => {
          // Data saved successfully!
          // alert('user created successfully');
          Notiflix.Notify.success('Registration successful! Welcome to Filmoteka!');
        })
        .catch(error => {
          // The write failed...
          alert(error);
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert(errorMessage);
    });
});

// -----------------Логін----------------------------

logSubmitData.addEventListener('click', () => {
  var email = document.getElementById('logEmail').value;
  var password = document.getElementById('logPassword').value;

  document.getElementById('logEmail').value = '';
  document.getElementById('logPassword').value = '';

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in

      const user = userCredential.user;
      refs.backdropLogin.classList.add('is-hidden');
      refs.scrollOnModal.classList.toggle('scroll-blocked');
      // ...
      //oncloseModal();
      var lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      })
        .then(() => {
          // Data saved successfully!
          Notiflix.Notify.success('Welcome to Filmoteka!');
        })
        .catch(error => {
          // The write failed...
          alert(error);
        });
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});

//-------------Вихід з аккаунту-------------------------------

function onLogOut() {
  signOut(auth);

  Notiflix.Notify.info('Sign-out successful');
}

// -----------------Переглядач Залогінений----------------------------

onAuthStateChanged(auth, user => {
  if (user) {
    //var userSignedIn = true;
    refs.backDropLibrary.classList.remove('library-displayNone');

    const indexMailSign = auth.currentUser.email.split('').indexOf('@');
    const nickName = auth.currentUser.email.slice(0, indexMailSign);

    const headerSigneddInBtn = document.querySelector('.logBtn');
    const markupIdAndSignOut = `<span style="color: var(--header-accent-color);
    text-transform: lowercase">${nickName}</span>&nbsp;&nbsp;<a>Log Out</a>`;

    headerSigneddInBtn.innerHTML = markupIdAndSignOut;
    refs.logOutRef.addEventListener('click', onLogOut);

    const uid = user.uid;
    //alert('User is signed in')
    // ...
  } else {
    // User is signed out
    // ...
    //var userSignedIn = false;
    refs.backDropLibrary.classList.add('library-displayNone');
    const txtLogBtn = document.querySelector('.logBtn');
    txtLogBtn.innerHTML = 'Sign In';

    const headerSigneddOutBtn = document.querySelector('.logBtn');
    const markupIdAndSignOut = `<a > Sign In</a>`;
    headerSigneddOutBtn.innerHTML = markupIdAndSignOut;
    refs.logOutRef.removeEventListener('click', onLogOut);
  }
});
