import {refs} from "../refs";
import movieTemplate from "../moivieTamplate";
import createPagination from "../pagination";


function renderWatchedMovies(){
    const films = JSON.parse(localStorage.getItem('watched'));
    
    if (!films){
        refs.filmsContainer.innerHTML = '';
    }else {
        const markup = films.map(movieTemplate);
        refs.filmsContainer.innerHTML = markup.join('');
    }
};

function renderQueueMovies(){
    const films = JSON.parse(localStorage.getItem('queue'));
    
    if (!films){
        refs.filmsContainer.innerHTML = '';
    }else {
        const markup = films.map(movieTemplate);
        refs.filmsContainer.innerHTML = markup.join('');
    }
}

export {renderWatchedMovies, renderQueueMovies};