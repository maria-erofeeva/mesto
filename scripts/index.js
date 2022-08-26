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

/*объявление изначального массива*/

const initialCards = [
  {
    name: "Байкал",
    link: "https://unsplash.com/photos/uPx334kOgm0",
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

const gallery = document.querySelector(".gallery");
const galleryCard = document.querySelector(".gallery__card");

/*открыть попап*/

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

/*отправка формы попапа*/

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

/*открыть модальное окно*/

const addCardButton = document.querySelector(".profile__add-photo-button");
const modalWholePage = document.querySelector(".modal");
const modalCloseButton = document.querySelector(".modal__close-icon");

function openModal() { 

  modalWholePage.classList.add("modal_opened"); 

} 

addCardButton.addEventListener("click", openModal);

function closeModal() {
  modalWholePage.classList.remove("modal_opened");
}

modalCloseButton.addEventListener("click", closeModal);











const modalElement = document.querySelector(".modal__form");
const modalTextInput = document.querySelector(".gallery__card-title");
const modalImageInput = document.querySelector(".gallery__image");
const templateElement = document.querySelector(".template");
const inputTitle = document.querySelector(".modal__input_type_title");
const inputLink = document.querySelector(".modal__input_type_image");


/*обработка события отправки формы*/

function handleSubmit(e) {
  e.preventDefault();

const name = inputTitle.value;
const link = inputLink.value;
  addCard(link, name);
}

/*создание карточки*/



function addCard(link, name) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector('.gallery__card-title').textContent = name;
  newCard.querySelector('.gallery__image').src = link;

  gallery.prepend(newCard);
 }

/*вызов создания карточки*/

initialCards.forEach(addCard);

modalElement.addEventListener('submit', handleSubmit);
