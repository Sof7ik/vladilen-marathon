let activeSlideIndex = 0;
const sliderContainer = document.querySelector('.container');
const mainSlideContainer = document.querySelector('.main-slide')
const slidesCount = mainSlideContainer.querySelectorAll('div').length;
const sidebar = document.querySelector('.sidebar');

function changeSlidehandler(direction) {
    if (direction === 'up') {
        activeSlideIndex++;

        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0
        }
    }
    else if (direction === 'down') {
        activeSlideIndex--;

        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1;
        }
    }

    sidebar.style.transform = `translateY(${activeSlideIndex * sliderContainer.clientHeight}px)`;
    mainSlideContainer.style.transform = `translateY(-${activeSlideIndex * sliderContainer.clientHeight}px)`;
}

document.addEventListener('DOMContentLoaded', e => {
    sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

    document.querySelector('.down-button').addEventListener('click', (event) => changeSlidehandler('down'))
    document.querySelector('.up-button').addEventListener('click', (event) => changeSlidehandler('up'))
})