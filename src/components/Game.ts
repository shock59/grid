import Grid from "./Grid";
import contains from "../lib/contains";
import Tile from "./Tile";
import Sidebar from "./Sidebar";
import createPipes from "../lib/createPipes";
import checkAnswer from "../lib/checkAnswer";
import Popup from "./Popup";

function randomLocation(
  range: { width: number; height: number },
  not: Coordinates[] = []
): Coordinates {
  const location = {
    x: Math.floor(Math.random() * range.width),
    y: Math.floor(Math.random() * range.height),
  };
  for (const notLocation of not) {
    if (notLocation.x == location.x && notLocation.y == location.y) {
      return randomLocation(range, not);
    }
  }
  return location;
}

export default class Game {
  element: HTMLDivElement;

  gridDimensions: { width: number; height: number };
  houseLocation: Coordinates;
  waterLocation: Coordinates;

  grid: Grid;
  sidebar: Sidebar;
  tiles: Tile[] = [];

  constructor() {
    this.element = document.querySelector<HTMLDivElement>("#game")!;

    const popup = new Popup("Grid", "Welcome to grid!", "Start");
    this.element.appendChild(popup.element);

    this.gridDimensions = {
      width: 10,
      height: 10,
    };
    const paddedGridDimensions = {
      width: this.gridDimensions.width - 2,
      height: this.gridDimensions.height - 2,
    };
    this.grid = new Grid(this.gridDimensions);

    this.houseLocation = randomLocation(paddedGridDimensions);
    this.waterLocation = randomLocation(paddedGridDimensions, [
      this.houseLocation,
    ]);
    this.houseLocation.x++;
    this.houseLocation.y++;
    this.waterLocation.x++;
    this.waterLocation.y++;

    const pipes = createPipes(
      this.gridDimensions,
      this.houseLocation,
      this.waterLocation
    );

    this.sidebar = new Sidebar(this, pipes.length);

    this.tiles.push(
      new Tile(
        this,
        {
          type: "house",
          static: true,
        },
        this.grid.cellElements[this.houseLocation.y][this.houseLocation.x]
      ),
      new Tile(
        this,
        {
          type: "water",
          static: true,
        },
        this.grid.cellElements[this.waterLocation.y][this.waterLocation.x]
      ),
      ...pipes.map(
        (pipe, index) =>
          new Tile(
            this,
            {
              type: "pipe",
              static: false,
              direction: pipe.direction,
            },
            this.sidebar.holderElements[index]
          )
      )
    );

    this.element.appendChild(this.grid.containerElement);
    this.element.appendChild(this.sidebar.element);
    for (const dt of this.tiles) this.element.appendChild(dt.element);

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
    for (const dt of this.tiles) {
      dt.element.style.transition = "none";
      dt.updateStyle();
      requestAnimationFrame(() => (dt.element.style.transition = ""));
    }
  }

  lockDraggableTile(draggableTile: Tile, event: MouseEvent) {
    const mouseXY = { x: event.x, y: event.y };

    for (const cell of this.element.querySelectorAll<HTMLDivElement>(
      ".grid-cell, .sidebar-holder"
    )) {
      const cellRect = cell.getBoundingClientRect();
      if (!contains(mouseXY, cellRect)) continue;
      if (this.tiles.find((tile) => tile.boundTo == cell)) continue;
      draggableTile.boundTo = cell;
      draggableTile.previousBoundTo = draggableTile.boundTo;

      if (cell.dataset.gridX && cell.dataset.gridY) {
        draggableTile.gridPosition = {
          x: Number(cell.dataset.gridX),
          y: Number(cell.dataset.gridY),
        };
      } else {
        draggableTile.gridPosition = undefined;
      }

      draggableTile.updateStyle();

      console.log(
        checkAnswer(
          this.houseLocation,
          this.waterLocation,
          this.tiles
            .filter(
              (tile) =>
                tile.options.type == "pipe" && tile.gridPosition != undefined
            )
            .map((pipeTile) => ({
              coordinates: {
                x: pipeTile.gridPosition!.x,
                y: pipeTile.gridPosition!.y,
              },
              direction: (pipeTile.options as TilePipeOptions).direction,
            }))
        )
      );

      return;
    }

    if (draggableTile.previousBoundTo) {
      draggableTile.boundTo = draggableTile.previousBoundTo;
      draggableTile.updateStyle();
    }
  }

  scrolled() {
    for (const tile of this.tiles) {
      tile.element.style.transition = "none";
      tile.updateStyle();
      requestAnimationFrame(() => (tile.element.style.transition = ""));
    }
  }
}
