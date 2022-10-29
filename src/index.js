/*импорт стилей*/

import "./index.css";

/*импорт констант*/

import {
  validationElements,
  currentName,
  currentDescription,
  popupProfileOpenButton,
  popupCloseButton,
  cardFormOpenButton,
  cardFormWholePage,
  cardFormCloseButton,
  formProfile,
  popupWholePage,
  popupName,
  popupDescription,
  gallery,
  cardFormElement,
  imageWholePage,
  imageCloseButton,
  popupOpenImage,
  initialCards
} from "./utils/constants.js";

/*импорт модулей*/

import { Card } from "./scripts/Card.js";
import { FormValidator } from "./scripts/FormValidator.js";
import { PopupWithForm } from './scripts/PopupWithForm.js';
import { PopupWithImage } from './scripts/PopupWithImage.js';
import { Section } from './scripts/Section.js';
import { UserInfo } from './scripts/UserInfo.js';

/*валидация всех форм*/

const createCardForm = new FormValidator(validationElements, cardFormElement);
createCardForm.enableValidation();
const editProfileForm = new FormValidator(validationElements, formProfile);
editProfileForm.enableValidation();

/*получить информацию о пользователе*/

const user = new UserInfo ({
  name: currentName,
  description: currentDescription
})

/*открыть попап*/

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("click", closeModalPress);
  document.addEventListener("keydown", closeByEsc);
}

/*закрыть попап*/

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("click", closeModalPress);
  document.removeEventListener("keydown", closeByEsc);
}

/*открыть/закрыть попап с редактированием профиля*/

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupWholePage);
  popupName.value = currentName.textContent;
  popupDescription.value = currentDescription.textContent;
  editProfileForm.buttonBlock();
});

popupCloseButton.addEventListener("click", function () {
  closePopup(popupWholePage);
});

/*отправка формы попапа*/

function submitProfileForm(evt) {
  evt.preventDefault();
  currentName.textContent = popupName.value;
  currentDescription.textContent = popupDescription.value;
  closePopup(popupWholePage);
}

formProfile.addEventListener("submit", submitProfileForm);

/*открыть/закрыть попап с добавлением карточки*/

const addPhotoPopup = new PopupWithForm (cardFormWholePage, (inputValues) => {
  const element = createNewCard({
    name: inputValues['.popup__input_type_name'],
    link: inputValues['.popup__input_type_description']
  })

  gallery.addItem(element);


  

// cardFormOpenButton.addEventListener("click", function () {
//   openPopup(cardFormWholePage);
//   createCardForm.buttonBlock();
// });

// cardFormCloseButton.addEventListener("click", function () {
//   closePopup(cardFormWholePage);
// });

});

addPhotoPopup.setEventListeners();

cardFormOpenButton.addEventListener('click', () => {
  addPhotoPopup.open();
})

/*удаление карточки*/

/*закрыть увеличение фото*/

imageCloseButton.addEventListener("click", function () {
  closePopup(imageWholePage);
});

/*создать карточку*/

function createNewCard(name, link, template) {
  const newCard = new Card(name, link, template, () => {
    popupOpenImage.open({
      name: name,
      link: link
    })
  });
  const cardElement = newCard.generateCard();
  return cardElement;
}

/*обход массива*/

// initialCards.forEach((item) => {
//   const card = createNewCard(item.name, item.link, ".template", () => {
//     popupOpenImage.open({
//       name: item.name,
//       link: item.link
//     })
//   });;
//   gallery.append(card);
// });

function addNewCard(card, container) {
  container.prepend(card);
}

/*создание карточки через попап*/

// function submitCardForm(e) {
//   const cardFormName = document.getElementById("popup-add-card-title");
//   const cardFormLink = document.getElementById("popup-add-card-link");
//   const newCardElement = createNewCard(
//     cardFormName.value,
//     cardFormLink.value,
//     ".template"
//   );
//   addNewCard(newCardElement, gallery);
//   closePopup(cardFormWholePage);
//   cardFormElement.reset();
//   e.preventDefault();
// }

const newCardPopup = new Section({ data: initialCards, renderer: (item) => {
  const card = createNewCard(item.name, item.link, ".template", () => {
    popupOpenImage.open({
      name: item.name,
      link: item.link
    })
  });;

  gallery.append(card);
}
}, gallery);

newCardPopup.addItem();

cardFormElement.addEventListener("submit", createNewCard);

/*закрытие попапа при клике на esc*/

// function closeByEsc(event) {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

/*закрытие попапа при клике вне*/

// function closeModalPress(event) {
//   if (
//     event.target.classList.contains("popup") ||
//     event.target.classList.contains("popup__close")
//   ) {
//     closePopup(event.currentTarget);
//   }
// 
