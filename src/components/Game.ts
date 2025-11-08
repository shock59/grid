import Grid from "./Grid";
import contains from "../lib/contains";
import Tile from "./Tile";
import Sidebar from "./Sidebar";

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

function randomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

const pipeDirections: PipeDirection[] = [
  "horizontal",
  "vertical",
  "topLeft",
  "topRight",
  "bottomLeft",
  "bottomRight",
];
function createPipes(
  dimensions: { width: number; height: number },
  houseLocation: Coordinates,
  waterLocation: Coordinates
) {
  const pipes: { coordinates: Coordinates; direction: PipeDirection }[] = [];
  const pipeDirection = randomFromArray(pipeDirections);
  const randomAxis = Math.random() < 0.5 ? "x" : "y";
  const pipeOffsetAxis = (() => {
    switch (pipeDirection) {
      case "horizontal":
        return "x";
      case "vertical":
        return "y";
      default:
        return randomAxis;
    }
  })();
  const randomOffsetDistance = Math.random() < 0.5 ? 1 : 1;
  const pipeOffsetDistance = (() => {
    switch (pipeDirection) {
      case "topLeft":
        return pipeOffsetAxis == "x" ? -1 : -1;
      case "topRight":
        return pipeOffsetAxis == "x" ? 1 : -1;
      case "bottomLeft":
        return pipeOffsetAxis == "x" ? -1 : 1;
      case "bottomRight":
        return pipeOffsetAxis == "x" ? 1 : 1;
      default:
        return randomOffsetDistance;
    }
  })();
  pipes.push({
    coordinates: {
      x: houseLocation.x + (pipeOffsetAxis == "x" ? pipeOffsetDistance : 0),
      y: houseLocation.y + (pipeOffsetAxis == "y" ? pipeOffsetDistance : 0),
    },
    direction: pipeDirection,
  });
  return pipes;
}

export default class Game {
  element: HTMLDivElement;

  grid: Grid;
  sidebar: Sidebar;
  draggableTiles: Tile[] = [];

  constructor() {
    this.element = document.querySelector<HTMLDivElement>("#game")!;

    const gridDimensions = {
      width: 10,
      height: 10,
    };
    const paddedGridDimensions = {
      width: gridDimensions.width - 2,
      height: gridDimensions.height - 2,
    };
    this.grid = new Grid(gridDimensions);
    this.sidebar = new Sidebar();

    const houseLocation = randomLocation(paddedGridDimensions);
    const waterLocation = randomLocation(paddedGridDimensions, [houseLocation]);
    houseLocation.x++;
    houseLocation.y++;
    waterLocation.x++;
    waterLocation.y++;

    const pipes = createPipes(gridDimensions, houseLocation, waterLocation);

    this.draggableTiles.push(
      new Tile(
        this,
        {
          type: "house",
          static: true,
        },
        this.grid.cellElements[houseLocation.y][houseLocation.x]
      ),
      new Tile(
        this,
        {
          type: "water",
          static: true,
        },
        this.grid.cellElements[waterLocation.y][waterLocation.x]
      ),
      new Tile(
        this,
        {
          type: "pipe",
          static: false,
          direction: "horizontal",
        },
        this.sidebar.holderElements[0]
      ),
      ...pipes.map(
        (pipe) =>
          new Tile(
            this,
            {
              type: "pipe",
              static: false,
              direction: pipe.direction,
            },
            this.grid.cellElements[pipe.coordinates.y][pipe.coordinates.x]
          )
      )
    );

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

  lockDraggableTile(draggableTile: Tile, event: MouseEvent) {
    const mouseXY = { x: event.x, y: event.y };

    for (const cell of this.element.querySelectorAll<HTMLDivElement>(
      ".grid-cell, .sidebar-holder"
    )) {
      const cellRect = cell.getBoundingClientRect();
      if (!contains(mouseXY, cellRect)) continue;
      draggableTile.boundTo = cell;
      draggableTile.previousBoundTo = draggableTile.boundTo;
      draggableTile.updateStyle();
      return;
    }

    if (draggableTile.previousBoundTo) {
      draggableTile.boundTo = draggableTile.previousBoundTo;
      draggableTile.updateStyle();
    }
  }
}
