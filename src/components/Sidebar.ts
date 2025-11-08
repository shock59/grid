import type Game from "./Game";

export default class Sidebar {
  element: HTMLDivElement;
  holderElements: HTMLDivElement[] = [];

  constructor(game: Game, holderCount: number) {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");
    this.element.addEventListener("scroll", () => game.scrolled());

    for (let i = 0; i < holderCount; i++) {
      const holder = document.createElement("div");
      holder.classList.add("sidebar-holder");
      this.holderElements.push(holder);
      this.element.appendChild(holder);
    }
  }
}
