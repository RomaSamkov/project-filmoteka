import ApiServise from './api';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const film__list = document.querySelector('.film__list');
const pagination = document.querySelector('.pagination');


const fetchData = new ApiServise();
console.log(fetchData);

function fetchAndRenderCards(){
    film__list.innerHTML = '';

    const data = fetchData.getTrendingFilm();

    data.then(({results, page, total_pages}) => {
    
        // const markup = createCard(results).join('');
        // film__list.insertAdjacentHTML('beforeend', markup);

        createPagination(page, total_pages);
    })
}
fetchAndRenderCards()

function createPagination(page, totalPages){
    const beforeTwoPage = page - 2;
    const beforePage = page - 1;
    const afterPage = page + 1;
    const afterTwoPage = page + 2;
    let markup = '';

    if(page > 1){
        markup += '<li>&laquo;</li>';
    }
    if(page > 1){
        markup += '<li>1</li>';
        if(page > 4){
            markup += '<li>...</li>';
        } 
    }
    if(page > 3){
        markup += `<li>${beforeTwoPage}</li>`;
    }
    if(page > 2){
        markup += `<li>${beforePage}</li>`;
    }

    markup += `<li class="isActive">${page}</li>`;

    if(page < totalPages - 1){
        markup += `<li>${afterPage}</li>`;
    }
    if(page < totalPages - 2){
        markup += `<li>${afterTwoPage}</li>`;
    }
    if(page < totalPages - 3){
        markup += '<li>...</li>';
    }    
    if(page < totalPages){
        markup += `<li>${totalPages}</li>`;
        markup += '<li>&raquo;</li>';
    }
    
    pagination.innerHTML = markup;
    pagination.addEventListener('click', onBtnClick);
};

function onBtnClick(event){
    if(event.target.nodeName !== "LI")return;
    const target = event.target.textContent;
    
    switch (target){
        case '»': 
            fetchData.incrementPage();
            fetchAndRenderCards();
        break;
        case '«': 
            fetchData.decrementPage();
            fetchAndRenderCards();
        break;
        case '...':
        break;
        default: 
            fetchData.setPage(target);
            fetchAndRenderCards();
    }
};


// function createCard(data) {
//     return data.map(({backdrop_path, poster_path, genre_ids, release_date, title, id}) => {
//         if (backdrop_path === null){
//                 backdrop_path = poster_path;
//                 if(poster_path === null) return;
//         }
//         return `<li class="card_item" id="${id}>
//                     <div class="img_thumb">
//                         <img src="${IMG_URL}${poster_path}" alt="${title}"/>
//                     </div>
//                     <p class="title">${title}</p>
//                     <p class="genre">${genre_ids.map(genre => {
//                         return `<span>${genre}</span>`
//                     }).join('')}</p>
//                     <p class="year">${release_date.slice(0, 4)}</p>
//                 </li>`
//     });
// };
