const grid = document.getElementById("realizacjeGrid");
const gridClip = document.getElementById("gridClip");
const loadMoreButton = document.getElementById("loadMoreButton");
const loadMoreText = document.querySelector("#loadMoreButton span");
const loadMoreIcon = document.querySelector("#loadMoreButton i");
var initialGridHeight = "";

var masonry = new Macy({
  container: ".grid",
  mobileFirst: true,
  columns: 1,
  breakAt: {
    650: 2,
    1000: 3,
  },
  margin: {
    x: 40,
    y: 40,
  },
});

function resetGradientHeight() {
  let gridHeight = Math.round(Number(initialGridHeight.slice(0, -2)) * 0.7);
  gridClip.style.height = `${gridHeight}px`;
  grid.style.setProperty("--gradientOpacity", 1);
  grid.style.setProperty("--gradientHeight", `${gridHeight}px`);
}

function changeGradientAndClip() {
  let gridHeight = grid.style.height;
  gridClip.style.height = gridHeight;
  grid.style.setProperty("--gradientOpacity", 0);
  grid.style.setProperty("--gradientHeight", "100%");
}

function addClickListenersToImages() {
  let images = document.querySelectorAll(".grid-item");
  images.forEach((image) => {
    image.addEventListener("click", () => {
      console.log(image.src);
    });
  });
}

masonry.on(masonry.constants.EVENT_RECALCULATED, function () {
  if (loadMoreButton.classList.contains("clicked")) {
    gridClip.style.height = grid.style.height;
    initialGridHeight = grid.style.height;
  } else {
    initialGridHeight = grid.style.height;
    resetGradientHeight();
  }
});

masonry.on(masonry.constants.EVENT_IMAGE_COMPLETE, function () {
  initialGridHeight = grid.style.height;
  resetGradientHeight();
  addClickListenersToImages();
});

loadMoreButton.addEventListener("click", () => {
  if (!loadMoreButton.classList.contains("clicked")) {
    changeGradientAndClip();
    loadMoreText.innerText = "Zwiń ";
    loadMoreIcon.classList.add("fa-rotate-180");
    loadMoreButton.classList.add("clicked");
  } else {
    resetGradientHeight();
    loadMoreText.innerText = "Rozwiń ";
    loadMoreIcon.classList.remove("fa-rotate-180");
    loadMoreButton.classList.remove("clicked");
  }
});
