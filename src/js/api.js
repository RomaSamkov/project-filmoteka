const API_KEY = 'f534638cb3304b9759e126ecf8f1bc28';
const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const API_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;

export default class ApiServise {
  constructor() {
    this.userSearch = '';
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
  incrementPage() {
    this.page += 1;
  }
  setPage(numberPage) {
    this.page = numberPage;
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
