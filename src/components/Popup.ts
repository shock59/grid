export default class Popup {
  element: HTMLDivElement;

  constructor(
    title: string,
    content: string,
    buttons: {
      text: string;
      callback: ((...args: unknown[]) => unknown) | undefined;
    }[]
  ) {
    const popupHeader = document.createElement("div");
    popupHeader.classList.add("popup-header");
    popupHeader.innerText = title;

    const popupContent = document.createElement("div");
    popupContent.classList.add("popup-content");
    popupContent.innerText = content;

    const popupButtonContainer = document.createElement("div");
    popupButtonContainer.classList.add("popup-button-container");

    for (const buttonOptions of buttons) {
      const popupButton = document.createElement("button");
      popupButton.classList.add("popup-button");
      popupButton.innerText = buttonOptions.text;
      popupButton.addEventListener("click", () => {
        this.element.remove();
        if (buttonOptions.callback != undefined) buttonOptions.callback();
      });
      popupButtonContainer.appendChild(popupButton);
    }

    const popup = document.createElement("div");
    popup.classList.add("popup");
    popup.appendChild(popupHeader);
    popup.appendChild(popupContent);
    popup.appendChild(popupButtonContainer);

    this.element = document.createElement("div");
    this.element.classList.add("popup-background");
    this.element.appendChild(popup);
  }
}
