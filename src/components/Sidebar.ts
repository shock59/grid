export default class Sidebar {
  element: HTMLDivElement;

  constructor() {
    this.element = document.createElement("div");
    this.element.classList.add("sidebar");
  }
}
