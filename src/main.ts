import "./style.css";

class Grid {
  dimensions: { width: number; height: number };
  containerElement: HTMLDivElement;
  element: HTMLDivElement;

  constructor(dimensions: { width: number; height: number }) {
    this.dimensions = dimensions;

    this.containerElement = document.createElement("div");
    this.element = document.createElement("div");
    this.containerElement.classList.add("grid-container");
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
    this.containerElement.appendChild(this.element);

    window.addEventListener("resize", () => this.updateCellSizes());
    this.updateCellSizes();
  }

  updateCellSizes() {
    const maxGridSize = Math.min(window.innerWidth, window.innerHeight);
    const cellCount = Math.max(this.dimensions.width, this.dimensions.height);
    const cellSize = maxGridSize / (cellCount + 1 + 2); // Add 1 to cellCount to add a margin of half a cell and 2 for the sidebar
    document
      .querySelector<HTMLDivElement>("#game")!
      .style.setProperty("--cell-size", `${cellSize}px`);
    this.element.style.margin = `${cellSize / 2}px`;
  }
}

class Sidebar {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");
  }
}

const gridDimensions = {
  width: 16,
  height: 16,
};
const grid = new Grid(gridDimensions);
const sidebar = new Sidebar();

const gameElement = document.querySelector<HTMLDivElement>("#game")!;
gameElement.appendChild(grid.containerElement);
gameElement.appendChild(sidebar.element);
