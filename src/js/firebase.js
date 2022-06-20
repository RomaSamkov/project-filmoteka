import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, set, ref, update } from "firebase/database";
import { refs } from './refs';

export const txtEmail = document.querySelector('#txtEmail');
export const txtPassword = document.querySelector('#txtPassword');

const firebaseConfig = {
  apiKey: "AIzaSyBg_vNQh-ymwUyewu5MxKAEmiok_RoIB6I",
  authDomain: "filmoteka-project4.firebaseapp.com",
  databaseURL: "https://filmoteka-project4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmoteka-project4",
  storageBucket: "filmoteka-project4.appspot.com",
  messagingSenderId: "1092490638254",
  appId: "1:1092490638254:web:3d9c0453d9f23e0d534e3f",
  measurementId: "G-PYKKCHZD62"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(firebaseApp);

// -----------------Реєстрація----------------------------

regSubmitData.addEventListener('click', (e) => {
  var email = document.getElementById('regEmail').value;
  var password = document.getElementById('regPassword').value;  
  document.getElementById('regEmail').value = "";
  document.getElementById('regPassword').value = "";
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
   
    refs.backdropLogin.classList.add('is-hidden');
    const user = userCredential.user;
    // ...
     set(ref(database, 'users/' + user.uid), {
    email: regEmail,
       password: regPassword,
    
     })
    .then(() => {
  // Data saved successfully!
     // alert('user created successfully');
})
.catch((error) => {
  // The write failed...
  alert(error);
});    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    alert(errorMessage);
  });
  
})

// -----------------Логін----------------------------

logSubmitData.addEventListener('click', () => {  
  var email = document.getElementById('logEmail').value;
  var password = document.getElementById('logPassword').value;

  document.getElementById('logEmail').value = "";
  document.getElementById('logPassword').value = "";  
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      // console.log('Signed in');
      console.log(auth.currentUser.email);
      const user = userCredential.user;
      refs.backdropLogin.classList.add('is-hidden');
      // ...
      //oncloseModal();
      var lgDate = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: lgDate,
      
      })
        .then(() => {
          // Data saved successfully!
          //alert('user logget in successfully');
        })
        .catch((error) => {
          // The write failed...
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    })
  
});

//-------------Вихід з аккаунту-------------------------------

refs.logOutRef.addEventListener('click',onLogOut);

function onLogOut(){
  signOut(auth);
  //alert('Sign-out successful');
}

// -----------------Переглядач Залогінений----------------------------

onAuthStateChanged(auth, (user) => {   
  if (user) {
   
    //var userSignedIn = true;
    refs.backDropLibrary.classList.remove('is-hidden');
    const headerSigneddInBtn = document.querySelector(".logBtn");
    const markupIdAndSignOut = `<span style="color: var(--header-accent-color);
    text-transform: lowercase">${auth.currentUser.email}</span><a> Log Out</a>`;

    headerSigneddInBtn.innerHTML =markupIdAndSignOut;

    const uid = user.uid;    
    //alert('User is signed in')
        // ...
  } else {
    
    // User is signed out
    // ...
    //var userSignedIn = false;
    refs.backDropLibrary.classList.add('is-hidden');
        const txtLogBtn = document.querySelector(".logBtn");
    txtLogBtn.innerHTML = 'Sign In';

    const headerSigneddOutBtn = document.querySelector(".logBtn");
    const markupIdAndSignOut =  `<a > Sign In</a>`;
    headerSigneddOutBtn.innerHTML =markupIdAndSignOut;
    
   // alert('User is signed out')
  }
});
