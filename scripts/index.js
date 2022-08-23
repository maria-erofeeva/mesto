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
let addCardButton = document.querySelector(".profile__add-photo-button");
let modalWholePage = document.querySelector(".modal");
let modalCloseButton = document.querySelector(".modal__close-icon");

/*const initialCards = [
  {
    name: "Байкал",
    link: "https://unsplash.com/photos/2VQcuE-IFDo",
  },
  {
    name: "Архангельск",
    link: "https://unsplash.com/photos/uPx334kOgm0",
  },
  {
    name: "Эльбрус",
    link: "https://unsplash.com/photos/9qsK2QHidmg",
  },
  {
    name: "Калязинская колокольня",
    link: "https://unsplash.com/photos/s8ZVDmzGwKQ",
  },
  {
    name: "Карачаевск",
    link: "https://unsplash.com/photos/5sPYYR6lG28",
  },
  {
    name: "Карелия",
    link: "https://unsplash.com/photos/nUdN80QHMpA",
  },
];

const out = '';
initialCards.forEach(el => {
    out += el.name;
    out += '<img src="' + el.link +'">';});
document.getElementById('outCards').innerHTML = out;*/


function openPopup() { 

  popupWholePage.classList.add("popup_opened"); 

  formInputName.value = currentName.textContent; 

  formInputDescription.value = currentDescription.textContent; 

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



function openModal() { 

  modalWholePage.classList.add("modal_opened"); 

} 

addCardButton.addEventListener("click", openModal);

function closeModal() {
  modalWholePage.classList.remove("modal_opened");
}

modalCloseButton.addEventListener("click", closeModal);
