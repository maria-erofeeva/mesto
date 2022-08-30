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

const popupProfileOpenButton = document.querySelector(".profile__name-edit");
const popupCloseButton = document.getElementById(
  "popup-edit-profile-close-button"
);
const formElement = document.getElementById("popup-edit-profile-form");
const popupWholePage = document.getElementById("popup-edit-profile");
const currentName = document.querySelector(".profile__current-name");
const currentDescription = document.querySelector(".profile__status");
const formInputName = document.querySelector(".popup__input_type_name");
const formInputDescription = document.querySelector(
  ".popup__input_type_description"
);
const popupName = document.querySelector(".popup__input_type_name");
const popupDescription = document.querySelector(
  ".popup__input_type_description"
);

const addCardButton = document.querySelector(".profile__add-photo-button");
const addCardWholePage = document.getElementById("popup-add-card");
const addCardCloseButton = document.getElementById(
  "popup-add-card-close-button"
);
const gallery = document.querySelector(".gallery");
const galleryCard = document.querySelector(".gallery__card");
const cardFormElement = document.getElementById("popup-add-card-form");
const templateElement = document.querySelector(".template");

const addCardName = document.getElementById("popup-add-card-title");
const addCardLink = document.getElementById("popup-add-card-link");
const openImageWholePage = document.getElementById("popup-open-image");
const galleryImage = document.querySelector(".gallery__image");
const galleryFig = document.querySelector(".gallery__card-title");
const popupImg = document.querySelector(".popup__foto");
const figcaptionText = document.querySelector(".popup__figcaption");
const likeButton = document.getElementById("gallery-like-button");
const imageCloseButton = document.getElementById(
  "popup-open-image-close-button"
);

/*открыть попап*/

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

/*закрыть попап*/

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

/*открыть/закрыть попап с редактированием профиля*/

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupWholePage);
  formInputName.value = currentName.textContent;
  formInputDescription.value = currentDescription.textContent;
});

popupCloseButton.addEventListener("click", function () {
  closePopup(popupWholePage);
});

/*отправка формы попапа*/

function submitProfileForm(evt) {
  evt.preventDefault();
  currentName.textContent = popupName.value;
  currentDescription.textContent = popupDescription.value;
  closePopup();
}

formElement.addEventListener("submit", submitProfileForm);

/*открыть/закрыть попап с добавлением карточки*/

addCardButton.addEventListener("click", function () {
  openPopup(addCardWholePage);
});

addCardCloseButton.addEventListener("click", function () {
  closePopup(addCardWholePage);
});

/*обработка события отправки формы*/



/*удаление карточки*/

function deleteCardForm(element) {
  const deletedCard = element.target.closest(".gallery__card");
  deletedCard.remove();
}

/*закрыть увеличение фото*/

imageCloseButton.addEventListener("click", function () {
  closePopup(openImageWholePage);
});

/*создание карточки*/

const newCard = templateElement.content.cloneNode(true);

function createCard() {
  newCard.querySelector(".gallery__image").src = addCardLink.value;
  newCard.querySelector(".gallery__card-title").textContent = addCardName.value;

  newCard.querySelector(".gallery__delete-button").addEventListener("click", deleteCardForm);
  newCard.querySelector(".gallery__card").addEventListener("click", function (element) {
      openImageWholePage.classList.add("popup_opened");
      popupImg.src = element.target.src;
      figcaptionText.textContent = this.textContent;
    });
    newCard.getElementById("gallery-like-button").addEventListener("click", function () { 

      document.getElementById("gallery-like-button").classList.toggle("gallery__like-button_active"); 
    
    });
    return newCard;
  };

/*добавление карточки на страницу*/

function addNewCard(card, container) {
  container.prepend(card);
};

/*добавление карточки через попап*/

function submitCardForm(e) {
  e.preventDefault();
  const newCardElement = createCard();
  addNewCard(newCardElement, gallery);
  closePopup(addCardWholePage);
  addCardLink.value = "";
  addCardName.value = "";
};

/*вызов*/

initialCards.forEach(function(item) { 

  const newCard = templateElement.content.cloneNode(true);
  newCard.querySelector(".gallery__image").src = item.link;
  newCard.querySelector(".gallery__card-title").textContent = item.name;

  newCard
    .querySelector(".gallery__delete-button")
    .addEventListener("click", deleteCardForm);

  newCard
    .querySelector(".gallery__image")
    .addEventListener("click", function (element) {
      openImageWholePage.classList.add("popup_opened");
      popupImg.src = element.target.src;
      figcaptionText.textContent = item.name;
    });

  gallery.prepend(newCard);
});

cardFormElement.addEventListener("submit", submitCardForm);
