import type Game from "./Game";

function capitalizeFirstLetter(text: string) {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

export default class DraggableTile {
  game: Game;

  type: DraggableTileOptions;

  element: HTMLDivElement;

  position: { x: number; y: number } = { x: 0, y: 0 };
  boundTo: Element | undefined;

  beingDragged: boolean = false;
  dragOffset: { x: number; y: number } = { x: 0, y: 0 };

  constructor(game: Game, type: DraggableTileOptions) {
    this.game = game;

    this.type = type;

    this.element = document.createElement("div");
    this.element.classList.add("draggable-tile");
    this.element.style.backgroundImage = `url(images/pipeWaterDynamic${capitalizeFirstLetter(
      type.direction
    )}.png)`;

    this.updateStyle();

    this.element.addEventListener("mousedown", (e) => this.mouseDown(e));
    document.addEventListener("mouseup", (e) => this.mouseUp(e));
    document.addEventListener("mousemove", (e) => this.mouseMove(e));
  }

  mouseDown(event: MouseEvent) {
    this.boundTo = undefined;

    this.element.style.cursor = "grabbing";

    const rect = this.element.getBoundingClientRect();
    this.dragOffset = { x: rect.width / 2, y: rect.height / 2 };
    this.position = {
      x: event.x - this.dragOffset.x,
      y: event.y - this.dragOffset.y,
    };

    this.updateStyle();
    this.beingDragged = true;
  }

  mouseUp(event: MouseEvent) {
    if (!this.beingDragged) return;
    this.element.style.transition = "";
    this.element.style.cursor = "";
    this.beingDragged = false;
    this.game.lockDraggableTile(this, event);
  }

  mouseMove(event: MouseEvent) {
    if (!this.beingDragged) return;
    const rect = this.element.getBoundingClientRect();
    this.element.style.transition = "none";
    this.position = {
      x: event.x - this.dragOffset.x,
      y: event.y - this.dragOffset.y,
    };

    const maxX = window.innerWidth - rect.width;
    const maxY = window.innerHeight - rect.height;
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x > maxX) this.position.x = maxX;
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y > maxY) this.position.y = maxY;
    this.updateStyle();
  }

  updateStyle() {
    if (this.boundTo) {
      const cellRect = this.boundTo.getBoundingClientRect();
      this.position = { x: cellRect.x, y: cellRect.y };
    }

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }
}
