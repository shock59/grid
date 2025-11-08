export default class Grid {
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
        row.appendChild(cell);
      }

      this.element.appendChild(row);
    }
    this.containerElement.appendChild(this.element);
  }
}
