import Grid from "./Grid";
import contains from "../lib/contains";
import DraggableTile from "./DraggableTile";
import Sidebar from "./Sidebar";

export default class Game {
  element: HTMLDivElement;

  grid: Grid;
  sidebar: Sidebar;
  draggableTiles: DraggableTile[] = [];

  constructor() {
    this.element = document.querySelector<HTMLDivElement>("#game")!;

    const gridDimensions = {
      width: 10,
      height: 10,
    };
    this.grid = new Grid(gridDimensions);
    this.sidebar = new Sidebar();
    this.draggableTiles.push(new DraggableTile(this));

    this.element.appendChild(this.grid.containerElement);
    this.element.appendChild(this.sidebar.element);
    for (const dt of this.draggableTiles) this.element.appendChild(dt.element);

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
    for (const dt of this.draggableTiles) {
      dt.element.style.transition = "none";
      dt.updateStyle();
      requestAnimationFrame(() => (dt.element.style.transition = ""));
    }
  }

  lockDraggableTile(draggableTile: DraggableTile, event: MouseEvent) {
    const mouseXY = { x: event.x, y: event.y };

    for (const cell of this.element.querySelectorAll<HTMLDivElement>(
      ".grid-cell, .sidebar-holder"
    )) {
      const cellRect = cell.getBoundingClientRect();
      if (!contains(mouseXY, cellRect)) continue;
      draggableTile.boundTo = cell;
      draggableTile.updateStyle();
      return;
    }
  }
}
