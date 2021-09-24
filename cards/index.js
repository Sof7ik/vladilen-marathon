function openCardHandler(event, slides) {
    slides.forEach(item => {
        item.classList.remove('active');
    })

    event.currentTarget.classList.add('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll('.slide');

    slides.forEach((slide, index) => {
        if (index === 0) {
            slide.classList.add('active');
        }
        slide.addEventListener('click', (event) => openCardHandler(event, slides));
        slide.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                openCardHandler(event, slides);
            }
        });
    })
})