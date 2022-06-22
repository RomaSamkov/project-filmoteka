function myLibraryHeaderTemplate() {
  return `
    <div class="header__navigation--library js-library">
      <a class="header__logo link js-logo" href="./index.html">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.82 2H4.18C2.97602 2 2 2.97602 2 4.18V19.82C2 21.024 2.97602 22 4.18 22H19.82C21.024 22 22 21.024 22 19.82V4.18C22 2.97602 21.024 2 19.82 2Z" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 2V22" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 2V22" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12H22" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 7H7" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17H7" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 17H22" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M17 7H22" stroke="#818181" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="header__title">Filmoteka</span>
      </a>
      <ul class="header__list list">
        <li class="header__nav">
          <a class="header__link link js-home-page" href="./index.html">Home</a>
        </li>
        <li class="header__nav library-move">
          <a class="header__link link header-nav--pege" href="#">My Library</a>
        </li>
        <li class="header__nav">
          <a class="header__link link js-loginModal-openBtn js-logOutRef logBtn librari-log" href="#">Sign In</a>
        </li>
      </ul>
    </div>
    <ul class="header__button list">
      <li class="header__item">
        <button class="header__btns isActive js-watched-btn" type="button" id="btn-watched">
          Watched
        </button>
      </li>
      <li class="header__item">
        <button class="header__btns  js-queue-btn" type="button" id="btn-queue">
          queue
        </button>
      </li>
      
    </ul>
    <div class="switcher">
      <button class="switcher-theme-name">Light</button>
      <label class="switch">
        <input type="checkbox" id="theme-switch" />
        <span class="slider round"></span>
      </label>
      <button class="switcher-theme-name">Dark</button>
    </div>
    `;
}

export default myLibraryHeaderTemplate;
