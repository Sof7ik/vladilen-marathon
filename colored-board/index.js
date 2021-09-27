const colors = [
    '#FDAC53', '#9BB7D4', '#B55A30', '#F5DF4D', '#0072B5', '#A0DAA9', '#00A170', '#926AA6', '#D2386C', '#E9897E'
];

function getRandomColor(colorsArray)
{
    const num = Math.floor(Math.random()*colorsArray.length);

    return colorsArray[num];
}

function setColor(elem)
{
    const color = getRandomColor(colors);

    elem.style.backgroundColor = color;
    elem.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

function removeColor(elem)
{
    elem.style.backgroundColor = '#1d1d1d';
    elem.style.boxShadow = `0 0 2px #000`;
}

document.addEventListener('DOMContentLoaded', e => {
    const board = document.getElementById('board');

    const squaresNum = 600;

    for(let i= 0; i < squaresNum; i++)
    {
        const squareElem = document.createElement('div');

        squareElem.classList.add('square')

        squareElem.addEventListener('mouseover', (event) => setColor(squareElem));

        squareElem.addEventListener('mouseleave', (event) => removeColor(squareElem));


        board.append(squareElem);
    }
})
