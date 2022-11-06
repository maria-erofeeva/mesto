import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitButton) {
    super(popupSelector);
    this._handleSubmitButton = handleSubmitButton;;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupButton.addEventListener('click', () => {
      this._handleSubmitButton(cardId, element);
    });
  }
}
