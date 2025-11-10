import type Game from "./Game";

export default class Sidebar {
  element: HTMLDivElement;
  holderElements: HTMLDivElement[] = [];

  constructor(game: Game, holderCount: number) {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");
    this.element.addEventListener("scroll", () => game.scrolled());

    const button = document.createElement("button")
    button.innerText = "Give up"
    button.addEventListener("click", () => game.giveUp())
    this.element.appendChild(button)

    for (let i = 0; i < holderCount; i++) {
      const holder = document.createElement("div");
      holder.classList.add("sidebar-holder");
      this.holderElements.push(holder);
      this.element.appendChild(holder);
    }
  }
}
