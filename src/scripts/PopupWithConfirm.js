import { Popup } from "./Popup.js";

export class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmitButton) {
    super(popupSelector);
    this._handleSubmitButton = handleSubmitButton;
    this._form = this._popup.querySelector(".popup__form");
  }

  /*установить слушатели*/

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  buttonToggle() {
    super.buttonToggle();
    this._popupButton.addEventListener("click", () => {
      this._popupButton.textContent = "Удаление...";
    });
  }

}
