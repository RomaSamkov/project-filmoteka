const darkTheme = {
  accent: '#ff6b08',
  main: '#000000',
  textColor: '#ffffff',
  footerlBgd: 'rgba(0, 0, 0, 0.56)',
  headerBgd: 'rgba(0, 0, 0, 0.56)',
  secondaryTextColor: '#ffffff',
  footerBgd: '#171717',
  footerText: '#f2f2f2',
  modalText: '#ffffff',
  modalBgd: '#171717',
  modalInfoText: '#e0dee0',
};

const lightTheme = {
  accent: '#ff6b08',
  main: '#ffffff',
  textColor: '#000000',
  footerlBgd: '#f7f7f7',
  headerBgd: 'rgba(0, 0, 0, 0.56)',
  secondaryTextColor: '#000000',
  footerBgd: '#f7f7f7',
  footerText: '#545454',
  modalText: '#000000',
  modalBgd: '#ffffff',
  modalInfoText: '#8c8c8c',
};

let currentTheme = 'light';

const element = document.documentElement;
const backgroundColorList = document.querySelector('.section');
const headerContainer = document.querySelector('.header');
const footerContainer = document.querySelector('.footer');

function switchTheme() {
  if (currentTheme === 'light') {
    element.style.setProperty('--accent-color', darkTheme.accent);
    element.style.setProperty('--primari-white-color', darkTheme.main);
    element.style.setProperty('--primary-text-color', darkTheme.textColor);
    element.style.setProperty('--secondary-text-color', darkTheme.secondaryTextColor);
    element.style.setProperty('--footer-background-color', darkTheme.footerBgd);
    element.style.setProperty('--footer-text-color', darkTheme.footerText);
    element.style.setProperty('--bgd-dark-color', darkTheme.bgr);
    element.style.setProperty('--text-modal-color', darkTheme.modalText);
    element.style.setProperty('--bgd-modal-color', darkTheme.modalBgd);
    element.style.setProperty('--information-modal-text-color', darkTheme.modalInfoText);

    backgroundColorList.classList.add('section--bgd');
    headerContainer.classList.add('header--shadow');
    footerContainer.classList.add('footer--shadow');

    currentTheme = 'dark';
  } else {
    element.style.setProperty('--accent-color', lightTheme.accent);
    element.style.setProperty('--primari-white-color', lightTheme.main);
    element.style.setProperty('--primary-text-color', lightTheme.textColor);
    element.style.setProperty('--secondary-text-color', lightTheme.secondaryTextColor);
    element.style.setProperty('--footer-background-color', lightTheme.footerBgd);
    element.style.setProperty('--footer-text-color', lightTheme.footerText);
    element.style.setProperty('--bgd-dark-color', lightTheme.bgr);
    element.style.setProperty('--text-modal-color', lightTheme.modalText);
    element.style.setProperty('--bgd-modal-color', lightTheme.modalBgd);
    element.style.setProperty('--information-modal-text-color', lightTheme.modalInfoText);

    backgroundColorList.classList.remove('section--bgd');
    headerContainer.classList.remove('header--shadow');
    footerContainer.classList.remove('footer--shadow');

    currentTheme = 'light';
  }
}

const themeSwitch = document.querySelector('#theme-switch');

themeSwitch.addEventListener('change', switchTheme);
