import { refs } from '../refs';
import myLibraryHeaderTemplate from './myLibraryHeaderTemplate';
import { renderWatchedMovies, renderQueueMovies } from './renderMyLibraryMovies';
import { checkedThem, switchTheme } from '../switcher';
import renderMoviesAndPagination from '../renderMoviesAndPagination';


refs.myLibraryBtn.addEventListener('click', onMyLibraryBtnClick);

function onMyLibraryBtnClick() {
  const markup = myLibraryHeaderTemplate();
  document.querySelector('.js-header-container').innerHTML = markup;
  refs.header.classList.add('my-library');
  refs.pagination.innerHTML = '';

  const themeSwitch = document.querySelector('#theme-switch');
  themeSwitch.addEventListener('change', switchTheme);

  renderWatchedMovies();
  checkedThem();

  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'light') {
    themeSwitch.checked = false;
  } else {
    themeSwitch.checked = true;
  }

  document.querySelector('.js-watched-btn').addEventListener('click', onWatchedBtn);
  document.querySelector('.js-queue-btn').addEventListener('click', onQueueBtn);
  
  document.querySelector('.js-logo').addEventListener('click', onLogoAndHomeLibrariHandler);
  document.querySelector('.js-home-page').addEventListener('click', onLogoAndHomeLibrariHandler);

  localStorage.setItem('library', 'watched');
  localStorage.setItem('search', '');
};

function onWatchedBtn() {
  renderWatchedMovies();
  document.querySelector('.js-queue-btn').classList.remove('isActive');
  document.querySelector('.js-watched-btn').classList.add('isActive');
};

function onQueueBtn() {
  renderQueueMovies();
  document.querySelector('.js-watched-btn').classList.remove('isActive');
  document.querySelector('.js-queue-btn').classList.add('isActive');
};

function onLogoAndHomeLibrariHandler(event){
  // event.preventDefault()
  localStorage.setItem('page', '1');
  localStorage.setItem('library', false);
  userFilms.setPage(1);
  renderMoviesAndPagination();
};


export default onMyLibraryBtnClick;