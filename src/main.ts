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
  }
}

class Sidebar {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");
  }
}

class DraggableTile {
  element: HTMLDivElement;
  position: { x: number; y: number } = { x: 0, y: 0 };
  beingDragged: boolean = false;
  dragOffset: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("draggable-tile");

    this.element.addEventListener("mousedown", (e) => this.mouseDown(e));
    document.addEventListener("mouseup", () => this.mouseUp());
    document.addEventListener("mousemove", (e) => this.mouseMove(e));
  }

  mouseDown(event: MouseEvent) {
    const rect = this.element.getBoundingClientRect();
    this.dragOffset = { x: event.x - rect.left, y: event.y - rect.top };
    this.beingDragged = true;
  }

  mouseUp() {
    if (!this.beingDragged) return;
    this.beingDragged = false;
  }

  mouseMove(event: MouseEvent) {
    if (!this.beingDragged) return;
    this.position = {
      x: event.x - this.dragOffset.x,
      y: event.y - this.dragOffset.y,
    };
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }
}

class Game {
  element: HTMLDivElement;

  grid: Grid;
  sidebar: Sidebar;

  constructor() {
    this.element = document.querySelector<HTMLDivElement>("#game")!;

    const gridDimensions = {
      width: 16,
      height: 16,
    };
    this.grid = new Grid(gridDimensions);
    this.sidebar = new Sidebar();

    this.element.appendChild(this.grid.containerElement);
    this.element.appendChild(this.sidebar.element);
    this.element.appendChild(new DraggableTile().element);

    window.addEventListener("resize", () => this.updateCellSizes());
    this.updateCellSizes();
  }

  updateCellSizes() {
    const maxGridSize = Math.min(window.innerWidth, window.innerHeight);
    const cellCount = Math.max(
      this.grid.dimensions.width,
      this.grid.dimensions.height
    );
    const cellSize = maxGridSize / (cellCount + 1 + 2); // Add 1 to cellCount to add a margin of half a cell and 2 for the sidebar
    document
      .querySelector<HTMLDivElement>("#game")!
      .style.setProperty("--cell-size", `${cellSize}px`);
    this.grid.element.style.margin = `${cellSize / 2}px`;
  }
}

new Game();
