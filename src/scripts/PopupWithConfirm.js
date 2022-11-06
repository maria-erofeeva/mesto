import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    super(popupSelector);
    this._handleSubmitButton = handleSubmitButton;
  }

  open(cardId, element) {
    super.open();
    this._popupSubmitButton.addEventListener('click', (evt) => {
      this._handleSubmitButton(cardId, element);
    });
  }
}
