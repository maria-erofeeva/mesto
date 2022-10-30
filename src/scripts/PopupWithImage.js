import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {

  open({name, link}) {
    super.open();
    this._popup.querySelector('.popup__foto').src = link;
    this._popup.querySelector('.popup__figcaption').textContent = name;
    this._popup.querySelector('.popup__foto').alt = name;
  }
}
