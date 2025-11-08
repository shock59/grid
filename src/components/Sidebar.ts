export default class Sidebar {
  element: HTMLDivElement;
  holderElements: HTMLDivElement[] = [];

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");

    const holderCount = 6;
    for (let i = 0; i < holderCount; i++) {
      const holder = document.createElement("div");
      holder.classList.add("sidebar-holder");
      this.holderElements.push(holder);
      this.element.appendChild(holder);
    }
  }
}
