parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"clu1":[function(require,module,exports) {

},{"./../images/Rectangle-1.jpg":[["Rectangle-1.e5afa49b.jpg","yV6S"],"yV6S"],"./../images/Rectangle-2.jpg":[["Rectangle-2.481b1074.jpg","pwSX"],"pwSX"],"./../images/Rectangle-3.jpg":[["Rectangle-3.9da5a505.jpg","pB2O"],"pB2O"],"./../images/Library-1.jpg":[["Library-1.b3d8f4c0.jpg","MTbZ"],"MTbZ"],"./../images/Library-2.jpg":[["Library-2.fea731da.jpg","AMU9"],"AMU9"],"./../images/Library-3.jpg":[["Library-3.20618f3e.jpg","s2m3"],"s2m3"]}],"VyiV":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.refs=void 0;const e={formSearch:document.querySelector(".header__form"),galleryContainer:document.querySelector(".gallery"),filmsContainer:document.querySelector(".film__list")};exports.refs=e;
},{}],"cZF8":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.IMG_URL=exports.API_KEY=void 0;const e="f534638cb3304b9759e126ecf8f1bc28";exports.API_KEY=e;const t="https://api.themoviedb.org/3",r=`${t}/trending/movie/day?api_key=${e}`,s="https://image.tmdb.org/t/p/w500";exports.IMG_URL=s;const i=`https://api.themoviedb.org/3/search/movie?api_key=${e}`;class a{constructor(){this.userSearch="",this.page=1}getTrendingFilm(){return fetch(`${r}&page=${this.page}`).then(e=>{if(e.ok)return e.json()})}onSearchFilm(){return this.incrementPage(),fetch(`${i}&query=${this.userSearch}&page=${this.page}`).then(e=>{if(e.ok)return e.json()})}incrementPage(){this.page+=1}setPage(e){this.page=e}resetPage(){this.page=0}get searchFilm(){return this.userSearch}set searchFilm(e){this.userSearch=e}}exports.default=a;
},{}],"kQBM":[function(require,module,exports) {
"use strict";var e=require("./refs"),r=t(require("./api"));function t(e){return e&&e.__esModule?e:{default:e}}const n=new r.default,a=r=>{if(r.preventDefault(),e.refs.galleryContainer.innerHTML="",n.searchFilm=r.target.elements.searchQuery.value.trim(),!n.searchFilm)return n.resetPage(),void n.getTrendingFilm().then(e=>console.log("рисуем разметку"));n.resetPage(),n.onSearchFilm().then(e=>console.log("Рисуем разметку")).catch(e=>console.log("Error"))};e.refs.formSearch.addEventListener("submit",a);
},{"./refs":"VyiV","./api":"cZF8"}],"oWkO":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=o;var e=require("./refs"),t=r(require("./api"));function n(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return n=function(){return e},e}function r(e){if(e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var t=n();if(t&&t.has(e))return t.get(e);var r={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var s=i?Object.getOwnPropertyDescriptor(e,o):null;s&&(s.get||s.set)?Object.defineProperty(r,o,s):r[o]=e[o]}return r.default=e,t&&t.set(e,r),r}const i=new t.default;function o(n){console.log(n.results);const r=n.results.map(e=>{const{original_title:n,poster_path:r,genre_ids:i,release_date:o,id:s}=e;return`\n        <a class="film__link" href="https://api.themoviedb.org/3/movie/${s}?api_key=${t.API_KEY}"><img src="${t.IMG_URL}${r}" alt="${n}" loading="lazy" class="film__image"/></a>\n      \n      <div class="info">\n        <h2 class="info__title">${n}</h2>\n        <div class="info__wrap">\n         {{#each genre_ids}}\n             <p class="info__title info__description">{{this}}</p>\n         {{/each}}\n          <p class="info__title info__description">${o}</p>\n        </div>\n      </div>\n\n     </a>\n        `}).join("");e.refs.filmsContainer.insertAdjacentHTML("beforeend",r)}i.getTrendingFilm().then(o);
},{"./refs":"VyiV","./api":"cZF8"}],"Focm":[function(require,module,exports) {
"use strict";require("./sass/main.scss"),require("./js/refs.js"),require("./js/api.js"),require("./js/onSearchByKeyWord.js"),require("./js/renderTrendsOnMain.js"),console.log("Hello World");
},{"./sass/main.scss":"clu1","./js/refs.js":"VyiV","./js/api.js":"cZF8","./js/onSearchByKeyWord.js":"kQBM","./js/renderTrendsOnMain.js":"oWkO"}]},{},["Focm"], null)
//# sourceMappingURL=/project-filmoteka/src.e44c8265.js.map