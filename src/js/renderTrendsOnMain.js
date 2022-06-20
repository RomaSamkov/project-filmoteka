import { refs } from './refs';
import createPagination from './pagination';
import { userFilms } from './api';
import toggleDragonSpiner from './spiner';
import movieTemplate from './movieTamplate';

refs.headerLogo.addEventListener('click', onLogoAndHomeClickHandler);
refs.headerHomePage.addEventListener('click', onLogoAndHomeClickHandler);

toggleDragonSpiner();
    userFilms.getTrendingFilm().then(({ results, page, total_pages }) => {
      setTimeout(() => {
        renderTrendsOnMain(results);
        createPagination(page, total_pages);
        toggleDragonSpiner();
      }, 1000);
    });



function onLogoAndHomeClickHandler(event){
  event.preventDefault()
  localStorage.setItem('page', '1');
  userFilms.setPage(1);
  
  toggleDragonSpiner();
    userFilms.getTrendingFilm().then(({ results, page, total_pages }) => {
      console.log('fetch', page);
      setTimeout(() => {
        renderTrendsOnMain(results);
        createPagination(page, total_pages);
        toggleDragonSpiner();
      }, 1000);
    });
}

function renderTrendsOnMain(films) {
  const murkup = films.map(movieTemplate);
  refs.filmsContainer.innerHTML = murkup.join('');
};

export {renderTrendsOnMain, onLogoAndHomeClickHandler};


// function checkWhatPageRender(){
//   const library = localStorage.getItem('library');
  
//   if(library){
//     onMyLibraryBtnClick();
//   }else {
//     toggleDragonSpiner();
//     userFilms.getTrendingFilm().then(({ results, page, total_pages }) => {
//       setTimeout(() => {
//         renderTrendsOnMain(results);
//         createPagination(page, total_pages);
//         toggleDragonSpiner();
//       }, 1000);
//     });
//   }

// }
// checkWhatPageRender();