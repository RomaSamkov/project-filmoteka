import axios from 'axios';
export const API_KEY = 'f534638cb3304b9759e126ecf8f1bc28';
export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_URL = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}`;



export default class ApiServise {
  constructor() {
    this.userSearch = setSearchQuery();
    this.id = 0;
    this.page = setCurrentPage();
  }
  async getTrendingFilm() {
    try {
      const trendingFilm = await axios.get(`${API_URL}&page=${this.page}`);
      return trendingFilm.data;
    } catch (error) {
      return;
    }
  }
  async onSearchFilm() {
    try {
      const response = await axios.get(`${SEARCH_URL}&query=${this.userSearch}&page=${this.page}`);
      return response.data;
    } catch (error) {
      return;
    }
  }
  async onSearchById() {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${this.id}?api_key=${API_KEY}`);
      return response.data;
    } catch (error) {
      return;
    }
  }
  async onSearchTrailerById() {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${this.id}/videos?api_key=${API_KEY}`);
      return response.data;
    } catch (error) {
      return;
    }
  }
  async onGetGenresId() {
    try {
      const genresId = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
      );
      return genresId.data;
    } catch (error) {
      return;
    }
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
  resetPage() {
    this.page = 1;
  }
  setId(newID) {
    this.id = newID;
  }
  get searchFilm() {
    return this.userSearch;
  }
  set searchFilm(newSearch) {
    this.userSearch = newSearch;
  }
};

const userFilms = new ApiServise();
export { userFilms };

function setCurrentPage(){
  const page = localStorage.getItem('page');
  if(!page) return 1;
  
  return Number(page);
};

function setSearchQuery(){
  const search = localStorage.getItem('search');
  if(!search) return '';
  
  return search;
};