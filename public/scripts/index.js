// Projects mouse scroll starts.
const slider = document.getElementById("projects");
let mouseDown = false;
let startX, scrollLeft;

let startDragging = (e) => {
    slider.style.cursor = "grabbing";
    mouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
};

let stopDragging = (event) => {
    slider.style.cursor = null;
    mouseDown = false;
};

slider.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (!mouseDown) {
        return;
    }
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
});

slider.addEventListener("mousedown", startDragging, false);
slider.addEventListener("mouseup", stopDragging, false);
slider.addEventListener("mouseleave", stopDragging, false);
