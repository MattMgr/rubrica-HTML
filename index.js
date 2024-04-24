const toggleView = document.getElementById("toggle-view");
const table = document.querySelector(".table-container");
const grid = document.querySelector(".grid-container");
const tableIcon = document.querySelector(".table");
const gridIcon = document.querySelector(".grid");

toggleView.addEventListener("change", function () {
  if (grid.classList.contains("hide") && table.classList.contains("show")) {
    grid.classList.replace("hide", "show");
    table.classList.replace("show", "hide");
    sessionStorage.setItem("view", "grid");
    toggleView.checked = true;
  } else if (
    table.classList.contains("hide") &&
    grid.classList.contains("show")
  ) {
    table.classList.replace("hide", "show");
    grid.classList.replace("show", "hide");
    sessionStorage.setItem("view", "table");
    toggleView.checked = false;
  }
});

if (
  sessionStorage.getItem("view") == "table" &&
  !table.classList.contains("show") &&
  !grid.classList.contains("hide") &&
  !table.classList.contains("hide") &&
  !grid.classList.contains("show")
) {
  table.classList.add("show");
  grid.classList.add("hide");
  toggleView.checked = false;
} else if (
  sessionStorage.getItem("view") == "grid" &&
  !table.classList.contains("show") &&
  !grid.classList.contains("hide") &&
  !table.classList.contains("hide") &&
  !grid.classList.contains("show")
) {
  table.classList.add("hide");
  grid.classList.add("show");
  toggleView.checked = true;
} else if (sessionStorage.getItem("view") == "table") {
  table.classList.replace("hide", "show");
  grid.classList.replace("show", "hide");
} else if (sessionStorage.getItem("view") == "grid") {
  grid.classList.replace("hide", "show");
  table.classList.replace("show", "hide");
} else {
  table.classList.add("show");
  grid.classList.add("hide");
}
