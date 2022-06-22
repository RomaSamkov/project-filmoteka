import Notiflix from 'notiflix';
import { refs } from './refs';
import { userFilms } from './api';
import movieTemplate from './movieTamplate';
import createPagination from './pagination';
import toggleDragonSpiner from './spiner';
import onMyLibraryBtnClick from './my-library/myLibraryBtn';
import {renderQueueMovies} from './my-library/renderMyLibraryMovies';

refs.headerLogo.addEventListener('click', onLogoAndHomeClickHandler);
refs.headerHomePage.addEventListener('click', onLogoAndHomeClickHandler);
checkWhatPageRender();

export default function renderMoviesAndPagination() {
  if (userFilms.userSearch) {
    toggleDragonSpiner();
    userFilms.onSearchFilm()
      .then(({ results, page, total_pages }) => {
        setTimeout(() => {
          if (results.length === 0) {

            Notiflix.Notify.failure(
              'Sorry, there are no videos matching your search query. Please try again.',
            );
            refs.filmsContainer.innerHTML = renderNotResults();
            createPagination(1, 1);
            toggleDragonSpiner();
            localStorage.setItem('page', '1');
            localStorage.setItem('search', '')
            return;
          }
          renderTrendsOnMain(results);
          createPagination(page, total_pages);
          toggleDragonSpiner();
        }, 1000);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  } else {
    toggleDragonSpiner();
    userFilms.getTrendingFilm()
      .then(({ results, page, total_pages }) => {
        setTimeout(() => {
          renderTrendsOnMain(results);
          createPagination(page, total_pages);
          toggleDragonSpiner();
        }, 1000);
      })
      .catch(error => Notiflix.Notify.failure('Error!'));
  }
};

function renderTrendsOnMain(films) {
  const murkup = films.map(movieTemplate);
  refs.filmsContainer.innerHTML = murkup.join('');
};

function checkWhatPageRender(){
  const library = localStorage.getItem('library');
  
  if(library === 'watched'){
    onMyLibraryBtnClick();

  }else if (library === 'queue'){
    onMyLibraryBtnClick();
    renderQueueMovies();
    document.querySelector('.js-watched-btn').classList.remove('isActive');
    document.querySelector('.js-queue-btn').classList.add('isActive');
    
  }else {
    renderMoviesAndPagination();
  };
};


function onLogoAndHomeClickHandler(event){
  event.preventDefault()
  localStorage.setItem('page', '1');
  localStorage.setItem('library', false);
  localStorage.setItem('search', '')
  userFilms.setPage(1);
  userFilms.userSearch = '';
  renderMoviesAndPagination();
};


function renderNotResults() {
  return `<li class="no-results"><img src='https://i.gifer.com/4m3f.gif' alt="No results" width= "100" class="img_r"/></li>`;
}