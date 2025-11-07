import "./style.css";

// Create the grid
const gridDimensions = {
  width: 16,
  height: 16,
};
const grid = document.createElement("div");
grid.classList.add("grid");
for (let rowIndex = 0; rowIndex < gridDimensions.height; rowIndex++) {
  const row = document.createElement("div");
  row.classList.add("grid-row");

  for (let columnIndex = 0; columnIndex < gridDimensions.width; columnIndex++) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.innerHTML = `${rowIndex * gridDimensions.width + columnIndex}`;
    row.appendChild(cell);
  }

  grid.appendChild(row);
}

document.querySelector<HTMLDivElement>("#game")!.appendChild(grid);
