import { Popup } from './Popup.js';

import { popupImg, figcaptionText } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(".gallery__image");
    this._title = document.querySelector(".gallery__card-title");
  }

  open({ name, link }) {
    super.open();
    popupImg.src = link;
    figcaptionText.textContent = name;
    popupImg.alt = name;
  }
}
