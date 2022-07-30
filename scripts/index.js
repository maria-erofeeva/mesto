let popupLink = document.querySelector(".profile__name-edit");
let popup = document.querySelector(".popup__container");
let popupCloseButton = document.querySelector(".popup__close-icon");
let formElement = document.querySelector(".popup__form");
let popupWholePage = document.querySelector(".popup");
let currentName = document.querySelector(".profile__current-name");
let currentDescription = document.querySelector(".profile__status");
let formInputName = document.querySelector(".popup__input_type_name");
let formInputDescription = document.querySelector(
  ".popup__input_type_description"
);

function openPopup() {
  popupWholePage.classList.add("popup_opened");
  formInputName.textContent = currentName.value;
  formInputDescription.textContent = currentDescription.value;
}

popupLink.addEventListener("click", openPopup);

function closePopup() {
  popupWholePage.classList.remove("popup_opened");
}

popupCloseButton.addEventListener("click", closePopup);

function formSubmitHandler(evt) {
  evt.preventDefault();

  let popupName = document.querySelector(".popup__input_type_name").value;

  let popupDescription = document.querySelector(
    ".popup__input_type_description"
  ).value;

  currentName.textContent = popupName;

  currentDescription.textContent = popupDescription;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
