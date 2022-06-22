import Notiflix from 'notiflix';
import { refs } from './refs';
import { userFilms } from './api';
import renderMoviesAndPagination from './renderMoviesAndPagination';



const onSearch = event => {
  event.preventDefault();
  refs.filmsContainer.innerHTML = '';
  const searchQuery = event.target.elements.searchQuery.value.trim();

  localStorage.setItem('search', searchQuery);
  localStorage.setItem('page', 1);
  userFilms.searchFilm = searchQuery;
  
  userFilms.resetPage();
  renderMoviesAndPagination();
  event.currentTarget.reset();
};

refs.formSearch.addEventListener('submit', onSearch);

