import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = document.querySelector(".popup__foto");
    this._popupFigcaption = this._popup.querySelector(".popup__figcaption");
  }

  /*открыть попап с картинкой*/

  open({ name, link }) {
    super.open();
    this._popupPhoto.src = link;
    this._popupFigcaption.textContent = name;
    this._popupPhoto.alt = name;
  }
}
