export default class Sidebar {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");

    const holderCount = 5;
    for (let i = 0; i < holderCount; i++) {
      const holder = document.createElement("div");
      holder.classList.add("sidebar-holder");
      this.element.appendChild(holder);
    }
  }
}
