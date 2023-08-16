const grid = document.getElementById("realizacjeGrid");
const loadMore = document.getElementById("loadMore");

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

loadMore.addEventListener("click", () => {
  console.log("click");
});
