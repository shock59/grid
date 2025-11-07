import "./style.css";

class Grid {
  dimensions: { width: number; height: number };
  element: HTMLDivElement;

  constructor(dimensions: { width: number; height: number }) {
    this.dimensions = dimensions;

    this.element = document.createElement("div");
    this.element.classList.add("grid");

    for (let rowIndex = 0; rowIndex < this.dimensions.height; rowIndex++) {
      const row = document.createElement("div");
      row.classList.add("grid-row");

      for (
        let columnIndex = 0;
        columnIndex < this.dimensions.width;
        columnIndex++
      ) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.innerHTML = `${rowIndex * this.dimensions.width + columnIndex}`;
        row.appendChild(cell);
      }

      this.element.appendChild(row);
    }
  }
}

// Create the grid
const gridDimensions = {
  width: 16,
  height: 16,
};
const grid = new Grid(gridDimensions);
document.querySelector<HTMLDivElement>("#game")!.appendChild(grid.element);
