/*объявление изначального массива*/

const initialCards = [
  {
    name: "Байкал",
    link: "images/baikal-min.jpg",
  },
  {
    name: "Архангельск",
    link: "images/arkhangelsk-min.jpg",
  },
  {
    name: "Эльбрус",
    link: "images/elbrus-min.jpg",
  },
  {
    name: "Калязинская колокольня",
    link: "images/kalyazin-min.jpg",
  },
  {
    name: "Карачаевск",
    link: "images/karachaevsk-min.jpg",
  },
  {
    name: "Карелия",
    link: "images/karelia-min.jpg",
  },
];

/*главная страница*/

const currentName = document.querySelector(".profile__current-name");
const currentDescription = document.querySelector(".profile__status");
const popupProfileOpenButton = document.querySelector(".profile__name-edit");
const popupCloseButton = document.getElementById(
  "popup-edit-profile-close-button"
);
const cardFormOpenButton = document.querySelector(".profile__add-photo-button");
const cardFormWholePage = document.getElementById("popup-add-card");
const cardFormCloseButton = document.getElementById(
  "popup-add-card-close-button"
);

/*попап – изменить данные*/

const formProfile = document.getElementById("popup-edit-profile-form");
const popupWholePage = document.getElementById("popup-edit-profile");
const popupName = document.querySelector(".popup__input_type_name");
const popupDescription = document.querySelector(
  ".popup__input_type_description"
);
const formInput = document.querySelector(".popup__input");
const nameInputError = formProfile.querySelector(`.${popupName.id}-error`);
const descriptionInputError = formProfile.querySelector(
  `.${popupDescription.id}-error`
);
const saveButton = document.querySelector(".popup__save");

/*галерея*/

const gallery = document.querySelector(".gallery");
const galleryCard = document.querySelector(".gallery__card");
const galleryImage = document.querySelector(".gallery__image");
const galleryFig = document.querySelector(".gallery__card-title");
const likeButton = document.getElementById("gallery-like-button");
const templateElement = document.querySelector(".template");

/*попап – добавить карточку*/

const cardFormElement = document.getElementById("popup-add-card-form");
const cardFormName = document.getElementById("popup-add-card-title");
const cardFormLink = document.getElementById("popup-add-card-link");
const createButton = document.querySelector(".popup__create");

/*попап – приблизить картинку*/

const imageWholePage = document.getElementById("popup-open-image");
const popupImg = document.querySelector(".popup__foto");
const figcaptionText = document.querySelector(".popup__figcaption");
const imageCloseButton = document.getElementById(
  "popup-open-image-close-button"
);

/*открыть попап*/

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener('click', closeModalPress);
}

/*закрыть попап*/

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener('click', closeModalPress);
}

/*открыть/закрыть попап с редактированием профиля*/

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupWholePage);
  popupName.value = currentName.textContent;
  popupDescription.value = currentDescription.textContent;
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

cardFormOpenButton.addEventListener("click", function () {
  openPopup(cardFormWholePage);
  buttonBlock(cardFormWholePage);
});

cardFormCloseButton.addEventListener("click", function () {
  closePopup(cardFormWholePage);
});

/*удаление карточки*/

function deleteCardForm(element) {
  const deletedCard = element.target.closest(".gallery__card");
  deletedCard.remove();
}

/*закрыть увеличение фото*/

imageCloseButton.addEventListener("click", function () {
  closePopup(imageWholePage);
});

/*создание карточки*/

function createCard(image, title) {
  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".gallery__image").src = image;
  newCard.querySelector(".gallery__card-title").textContent = title;
  newCard.querySelector(".gallery__image").alt = title;

  newCard
    .querySelector(".gallery__delete-button")
    .addEventListener("click", deleteCardForm);
  newCard
    .querySelector(".gallery__image")
    .addEventListener("click", function (element) {
      openPopup(imageWholePage);
      popupImg.src = element.target.src;
      figcaptionText.textContent = title;
      popupImg.alt = title;
    });
  newCard
    .querySelector(".gallery__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("gallery__like-button_active");
    });
  return newCard;
}

/*добавление карточки на страницу*/

function addNewCard(card, container) {
  container.prepend(card);
}

/*добавление карточки через попап*/

function submitCardForm(e) {
  e.preventDefault();
  const newCardElement = createCard(cardFormLink.value, cardFormName.value);
  addNewCard(newCardElement, gallery);
  closePopup(cardFormWholePage);
  cardFormElement.reset();
}

/*вызов*/

initialCards.forEach((card) => {
  const newCard = createCard(card.link, card.name);
  gallery.prepend(newCard);
});

cardFormElement.addEventListener("submit", submitCardForm);

/*закрытие попапа при клике на esc*/

document.addEventListener('keydown', closeByEsc);

function closeByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closeModalPress(event) {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close')) { 
    closePopup(event.currentTarget);
 }
}




