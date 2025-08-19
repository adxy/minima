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

// Scroll buttons functionality
const scrollLeftBtn = document.getElementById("scrollLeft");
const scrollRightBtn = document.getElementById("scrollRight");

const updateScrollButtons = () => {
  const isAtStart = slider.scrollLeft <= 0;
  const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth;

  scrollLeftBtn.disabled = isAtStart;
  scrollRightBtn.disabled = isAtEnd;
};

const scrollProjects = (direction) => {
  const scrollAmount = 300;
  const newScrollLeft =
    slider.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount);

  slider.scrollTo({
    left: newScrollLeft,
    behavior: "smooth",
  });

  setTimeout(updateScrollButtons, 300);
};

scrollLeftBtn.addEventListener("click", () => scrollProjects("left"));
scrollRightBtn.addEventListener("click", () => scrollProjects("right"));

// Update button states on scroll
slider.addEventListener("scroll", updateScrollButtons);

// Initial button state
updateScrollButtons();
