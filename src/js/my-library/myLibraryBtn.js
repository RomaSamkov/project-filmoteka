import { refs } from '../refs';
import myLibraryHeaderTemplate from './myLibraryHeaderTemplate';
import { renderWatchedMovies, renderQueueMovies } from './renderMyLibraryMovies';
import { checkedThem, switchTheme } from '../switcher';

refs.myLibraryBtn.addEventListener('click', onMyLibraryBtnClick);

function onMyLibraryBtnClick() {
  refs.header.classList.add('my-library');
  const markup = myLibraryHeaderTemplate();
  refs.headerContainer.innerHTML = markup;
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

  // localStorage.setItem('library', true);
}

function onWatchedBtn() {
  renderWatchedMovies();
  document.querySelector('.js-queue-btn').classList.remove('isActive');
  document.querySelector('.js-watched-btn').classList.add('isActive');
}

function onQueueBtn() {
  renderQueueMovies();
  document.querySelector('.js-watched-btn').classList.remove('isActive');
  document.querySelector('.js-queue-btn').classList.add('isActive');
}


export default onMyLibraryBtnClick;