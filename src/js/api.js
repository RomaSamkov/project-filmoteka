const axios = require('axios').default;

export const API_KEY = 'f534638cb3304b9759e126ecf8f1bc28';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

export default class ApiServise {
  constructor() {
    this.userSearch = '';
    this.id = 0;
    this.page = 1;
  }
  getTrendingFilm() {
    return fetch(`${API_URL}&page=${this.page}`).then(trendingFilm => {
      if (!trendingFilm.ok) {
        return;
      }
      return trendingFilm.json();
    });
  }
  onSearchFilm() {
    this.incrementPage();
    return fetch(`${SEARCH_URL}&query=${this.userSearch}&page=${this.page}`).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    });
  }
  onSearchById() {
    return fetch(`${BASE_URL}/movie/${this.id}?api_key=${API_KEY}`).then(response => {
      if (!response.ok) {
        return;
      }
      return response.json();
    });
  }

  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  setPage(numberPage) {
    this.page = numberPage;
  }
  setId(newID) {
    this.id = newID;
  }
  resetPage() {
    this.page = 0;
  }
  get searchFilm() {
    return this.userSearch;
  }
  set searchFilm(newSearch) {
    this.userSearch = newSearch;
  }
}

const userFilms = new ApiServise();
export { userFilms };
