import type Game from "./Game";

export default class DraggableTile {
  game: Game;

  element: HTMLDivElement;
  position: { x: number; y: number } = { x: 0, y: 0 };
  beingDragged: boolean = false;
  dragOffset: { x: number; y: number } = { x: 0, y: 0 };

  constructor(game: Game) {
    this.game = game;

    this.element = document.createElement("div");
    this.element.classList.add("draggable-tile");

    this.updateStyle();

    this.element.addEventListener("mousedown", (e) => this.mouseDown(e));
    document.addEventListener("mouseup", (e) => this.mouseUp(e));
    document.addEventListener("mousemove", (e) => this.mouseMove(e));
  }

  mouseDown(event: MouseEvent) {
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
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }
}
