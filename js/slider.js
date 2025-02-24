document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".cards-container");
    const prevBtn = document.querySelector(".antes");
    const nextBtn = document.querySelector(".siguiente");

    let scrollAmount = 0;
    const scrollStep = 320; // Tamaño de desplazamiento (ajustado al ancho de la card)
    const maxScroll = container.scrollWidth - container.clientWidth;

    nextBtn.addEventListener("click", () => {
        if (scrollAmount < maxScroll) {
            scrollAmount += scrollStep;
            container.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });

    prevBtn.addEventListener("click", () => {
        if (scrollAmount > 0) {
            scrollAmount -= scrollStep;
            container.style.transform = `translateX(-${scrollAmount}px)`;
        }
    });
});
