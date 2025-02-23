let index = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-item');
    index += step;

    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;

    document.querySelector('.carousel-container').style.transform = `translateX(${-index * 100}%)`;
}

// Auto-play
setInterval(() => moveSlide(1), 3000);

// Event listeners para los botones (si quieres usar addEventListener en vez de inline HTML)
document.querySelector(".prev").addEventListener("click", () => moveSlide(-1));
document.querySelector(".next").addEventListener("click", () => moveSlide(1));
