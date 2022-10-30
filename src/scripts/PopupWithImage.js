import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(".popup__foto");
    this._title = document.querySelector(".popup__figcaption");
  }

  open({name, link}) {
    super.open();
    // popupImg.src = link;
    // figcaptionText.textContent = name;
    // popupImg.alt = name;
    this._image = link;
    this._title = name;
    this._title = name;
  }
}
