import { refs } from './refs';
import { userFilms } from './api';
import renderMoviesAndPagination from './renderMoviesAndPagination';

export default function createPagination(page, totalPages) {
  const beforeTwoPage = page - 2;
  const beforePage = page - 1;
  const afterPage = page + 1;
  const afterTwoPage = page + 2;
  let markup = '';

  if (page > 1) {
    markup += '<li class="arrow">&laquo;</li>';
  }
  if (page > 1) {
    markup += '<li>1</li>';
    if (page > 4) {
      markup += '<li>...</li>';
    }
  }
  if (page > 3) {
    markup += `<li>${beforeTwoPage}</li>`;
  }
  if (page > 2) {
    markup += `<li>${beforePage}</li>`;
  }

  markup += `<li class="isActive">${page}</li>`;

  if (page < totalPages - 1) {
    markup += `<li>${afterPage}</li>`;
  }
  if (page < totalPages - 2) {
    markup += `<li>${afterTwoPage}</li>`;
  }
  if (page < totalPages - 3) {
    markup += '<li>...</li>';
  }
  if (page < totalPages) {
    markup += `<li>${totalPages}</li>`;
    markup += '<li class="arrow">&raquo;</li>';
  }

  refs.pagination.innerHTML = markup;
  refs.pagination.addEventListener('click', onBtnClick);
}

function onBtnClick(event) {
  if (event.target.nodeName !== 'LI') return;
  const target = event.target.textContent;

  switch (target) {
    case '»':
      userFilms.incrementPage();
      renderMoviesAndPagination();
      scrollToTop();
      break;
    case '«':
      userFilms.decrementPage();
      renderMoviesAndPagination();
      scrollToTop();
      break;
    case '...':
      break;
    default:
      userFilms.setPage(Number(target));
      renderMoviesAndPagination();
      scrollToTop();
  }
  const page = JSON.stringify(userFilms.page);
  localStorage.setItem('page', page);
}

function scrollToTop(){
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
});
}