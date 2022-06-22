import { refs } from "./refs";
var throttle = require('lodash.throttle');

refs.scrollToTopBtn.addEventListener('click', onScrollTotopBtn );
window.addEventListener('scroll',throttle(scrollWindow, 300));

function scrollWindow(){
    if (window.pageYOffset > window.innerHeight){
        refs.scrollToTopBtn.classList.add('isShow');
    }else{
        refs.scrollToTopBtn.classList.remove('isShow');
    }
};

function onScrollTotopBtn(){

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
};

