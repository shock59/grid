import Grid from "./Grid";
import contains from "../lib/contains";
import DraggableTile from "./DraggableTile";
import Sidebar from "./Sidebar";

export default class Game {
  element: HTMLDivElement;

  grid: Grid;
  sidebar: Sidebar;

  level: string[][];

  constructor() {
    this.element = document.querySelector<HTMLDivElement>("#game")!;

    const gridDimensions = {
      width: 10,
      height: 10,
    };
    this.level = new Array(gridDimensions.height)
      .fill("")
      .map(() => new Array(gridDimensions.width).fill("").map(() => "green"));
    this.grid = new Grid(gridDimensions, this.level);
    this.sidebar = new Sidebar();

    this.element.appendChild(this.grid.containerElement);
    this.element.appendChild(this.sidebar.element);
    this.element.appendChild(new DraggableTile(this).element);

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

  lockDraggableTile(draggableTile: DraggableTile, event: MouseEvent) {
    const mouseXY = { x: event.x, y: event.y };

    const gridRect = this.grid.element.getBoundingClientRect();
    if (!contains(mouseXY, gridRect)) return;

    for (const cell of this.grid.element.querySelectorAll<HTMLDivElement>(
      ".grid-cell"
    )) {
      const cellRect = cell.getBoundingClientRect();
      if (!contains(mouseXY, cellRect)) continue;
      draggableTile.position = { x: cellRect.x, y: cellRect.y };
      draggableTile.updateStyle();
      return;
    }
  }
}
