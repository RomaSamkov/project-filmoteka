import {refs} from '../refs';
import myLibraryHeaderTemplate from './myLibraryHeaderTemplate';
import instanceFetchMovies from '../api';


refs.myLibraryBtn.addEventListener('click', onMyLibraryBtnClick);

function onMyLibraryBtnClick(){
    // instanceFetchMovies.myLibraryState = true;

    const markup = myLibraryHeaderTemplate();
    refs.headerContainer.innerHTML = markup;
    
    // renderWatchedMovies();
}