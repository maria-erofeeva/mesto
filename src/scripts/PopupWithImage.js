import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupFoto = document.querySelector(".popup__foto");
  }

  open({ name, link }) {
    super.open();
    this._popupFoto.src = link;
    this._popup.querySelector(".popup__figcaption").textContent = name;
    this._popup.querySelector(".popup__foto").alt = name;
  }
}
