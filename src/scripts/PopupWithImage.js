export { Popup } from "../scripts/Popup.js";

import {
  popupImg,
  figcaptionText,
} from "../index.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._title = this._popupSelector.querySelector(".gallery__image");
    this._image = this._popupSelector.querySelector(".gallery__card-title");
  }

  open() {
    super.open();
    popupImg.src = this._image;
    figcaptionText.textContent = this._title;
    popupImg.alt = this._title;
  }
}
