const startBtn = document.querySelector('.start');
const screens = document.querySelectorAll('.screen');

const timesList = document.querySelector('.time-list');
const timeElem = document.getElementById('time');

const board = document.getElementById('board');

let time = 0;
let score = 0;
let interval;

const circleColors = [
    '#FDAC53', '#9BB7D4', '#B55A30', '#F5DF4D', '#0072B5', '#A0DAA9', '#00A170', '#926AA6', '#D2386C', '#E9897E'
];

function startGame(playingTime) {
    board.innerHTML = '';
    timeElem.parentNode.classList.remove('hide');

    interval = setInterval(decreaseTime, 1000);
    renderTime(playingTime);
    createCircle(circleColors);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
        clearInterval(interval);
    }
    else {
        let current = --time;
        if (current < 10) current = `0${current}`;

        renderTime(current);
    }
}

function renderTime(timeValue) {
    timeElem.textContent = `00:${timeValue}`;
}

function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createCircle(colors) {
    const circle = document.createElement('div');

    circle.classList.add('circle');

    const colorIndex = getRandomNum(0, colors.length - 1);
    const color = colors[colorIndex];

    circle.style.backgroundColor = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    const { width, height } = board.getBoundingClientRect();

    const circleSize = getRandomNum(20, 50);

    const posY = getRandomNum(0, height - circleSize);
    const posX = getRandomNum(0, width - circleSize);


    console.log("Y", posY, "X", posX);

    circle.style.top = `${posY}px`;
    circle.style.left = `${posX}px`;

    circle.style.width = `${circleSize}px`;
    circle.style.height = `${circleSize}px`;

    board.appendChild(circle);
}

function finishGame() {
    timeElem.parentNode.classList.add('hide');

    board.innerHTML = `
        <div class="finish-wrapper">
            <h1>Ваш счёт: <span class="primary">${score}</span></h1>
            <button id="again">начать заново</button>
        </div>
    `;

    document.getElementById('again').addEventListener('click', event => {
        screens[1].classList.remove('up');
        screens[2].classList.remove('up');
    })
}

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timesList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.dataset.timeValue);
    }

    screens[1].classList.add('up');

    startGame(time);
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        event.target.remove();
        score++;
        createCircle(circleColors);
    }
})