const grid = document.getElementById("realizacjeGrid"),
  gridClip = document.getElementById("gridClip"),
  loadMoreButton = document.getElementById("loadMoreButton"),
  loadMoreText = document.querySelector("#loadMoreButton span"),
  loadMoreIcon = document.querySelector("#loadMoreButton i"),
  slides = document.querySelectorAll(".slide"),
  slidesPrev = document.getElementById("slidesPrevBtn"),
  slidesNext = document.getElementById("slidesNextBtn"),
  ofertaBtn = document.getElementById("ofertaBtn"),
  ofertaIcon = document.getElementById("ofertaIcon"),
  dropdownCustomMenu = document.getElementById("dropdownCustomMenu"),
  searchBar = document.getElementById("searchBar"),
  searchBarBtn = document.getElementById("searchBarBtn"),
  searchBarClose = document.getElementById("searchBarClose"),
  searchBarInput = document.getElementById("searchBarInput"),
  imageGallery = document.getElementById("imageGallery"),
  imageGalleryClose = document.getElementById("imageGalleryClose"),
  imageGalleryImg = document.getElementById("imageGalleryImg"),
  imageGalleryPrev = document.getElementById("imageGalleryPrev"),
  imageGalleryNext = document.getElementById("imageGalleryNext"),
  imageGalleryPreview = document.getElementById("imageGalleryPreview"),
  preview = document.querySelectorAll(".image-gallery-preview img"),
  previewImages = Array.from(preview);

var initialGridHeight = "",
  currentSlide = 0,
  currentImage = -1;

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
  let images = document.querySelectorAll(".grid-item"),
    imagesArray = [...images];
  images.forEach((image) => {
    image.addEventListener("click", () => {
      openImageGallery(image.src, imagesArray.indexOf(image));
    });
  });
}

function openImageGallery(src, index) {
  imageGallery.classList.add("image-gallery-active");
  imageGalleryImg.src = src;
  currentImage = index;
}

function controlImageGallery() {
  let image = previewImages[currentImage];
  openImageGallery(image.src, previewImages.indexOf(image));
}

function toggleSlideActive(target) {
  slides[currentSlide].classList.toggle("slide-active");
  currentSlide = target;
  slides[currentSlide].classList.toggle("slide-active");
}

function togleLoadMoreButton(name) {
  loadMoreText.innerText = name;
  loadMoreIcon.classList.toggle("fa-rotate-180");
  loadMoreButton.classList.toggle("clicked");
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
    togleLoadMoreButton("Zwiń ");
  } else {
    resetGradientHeight();
    togleLoadMoreButton("Rozwiń ");
    loadMoreText.innerText = "Rozwiń ";
  }
});

slidesPrev.addEventListener("click", () => {
  if (currentSlide - 1 < 0) toggleSlideActive(slides.length - 1);
  else toggleSlideActive(currentSlide - 1);
});

slidesNext.addEventListener("click", () => {
  if (currentSlide + 1 >= slides.length) toggleSlideActive(0);
  else toggleSlideActive(currentSlide + 1);
});

ofertaBtn.addEventListener("click", () => {
  dropdownCustomMenu.classList.toggle("dropdown-active");
  ofertaIcon.classList.toggle("fa-rotate-180");
});

searchBarBtn.addEventListener("click", () => {
  if (searchBar.classList.contains("search-bar-active")) {
    alert(`Wyszukano: ${searchBarInput.value}`);
    searchBarInput.value = "";
  } else {
    searchBar.classList.toggle("search-bar-active");
  }
});

searchBarClose.addEventListener("click", () => {
  searchBar.classList.toggle("search-bar-active");
});

imageGalleryClose.addEventListener("click", () => {
  imageGallery.classList.toggle("image-gallery-active");
});

previewImages.forEach((previewImage) => {
  previewImage.addEventListener("click", () => {
    openImageGallery(previewImage.src, previewImages.indexOf(previewImage));
  });
});

imageGalleryPrev.addEventListener("click", () => {
  if (currentImage - 1 < 0) currentImage = previewImages.length - 1;
  else currentImage -= 1;
  controlImageGallery();
});

imageGalleryNext.addEventListener("click", () => {
  if (currentImage + 1 >= previewImages.length) currentImage = 0;
  else currentImage += 1;
  controlImageGallery();
});
