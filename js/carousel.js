const btnizq = document.querySelector(".prev"),
      btndere = document.querySelector(".next"),
      slider = document.querySelector("#slider"),
      sliderSection = document.querySelectorAll(".slider-section");

btnizq.addEventListener("click", e => moverizq());
btndere.addEventListener("click", e => moverdere());

setInterval(() => {
   moverdere()
}, 4000);

let operacion = 0;
    counter = 0;
    widthImg = 100/sliderSection.length;

function moverdere(){
    if(counter >= sliderSection.length-1){
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`; 
        slider.style.transition="none"
        return;
    }
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
}
function moverizq(){
    counter--;
    if(counter < 0){
        counter = sliderSection.length-1;
        operacion = widthImg*(sliderSection.length-1);
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition="none"
        return;
    }
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
}