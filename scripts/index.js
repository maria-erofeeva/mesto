let popupLink = document.querySelector(".profile__name-edit");
let popup = document.querySelector(".popup__container");
let popupCloseButton = document.querySelector(".popup__close-icon");
let popupSaveButton = document.querySelector(".popup__save");
let formElement = document.querySelector(".popup__form");
let popupWholePage = document.querySelector(".popup");
let currentName = document.querySelector(".profile__current-name");
let currentDescription = document.querySelector(".profile__status");
let formInputName = document.querySelector(".popup__form_input-name");
let formInputDescription = document.querySelector(".popup__form_input-description");

function openPopup() {
  popupWholePage.classList.add("popup_opened");
  formInputName.textContent = document.querySelector(".profile__current-name").value;
  formInputDescription.textContent = document.querySelector(".profile__status").value;
}

popupLink.addEventListener("click", openPopup);

function closePopup() {
  popupWholePage.classList.remove("popup_opened");
}

popupCloseButton.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();

  let popupName = document.querySelector(".popup__form_input-name").value;

  let popupDescription = document.querySelector(".popup__form_input-description").value;

  currentName.textContent = popupName;

  currentDescription.textContent = popupDescription;
}

popupSaveButton.addEventListener("click", formSubmitHandler);
popupSaveButton.addEventListener("click", closePopup);
