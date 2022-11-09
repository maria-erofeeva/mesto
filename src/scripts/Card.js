export class Card {
  constructor(
    card,
    userId,
    templateSelector,
    { handleCardClick, deletePopupConfirm, handleLikeClick }
  ) {
    this._card = card;
    this._userId = userId;
    this._cardId = card._id;
    this._owner = card.owner._id;
    this._link = card.link;
    this._title = card.name;
    this._likes = card.likes;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._deletePopupConfirm = deletePopupConfirm;
  }

  isLikedByUser() {
    return this._likes.some((ownerId) => ownerId._id === this._userId);
  }

  countLikes({ likes }) {
    this._likes = likes;
    this._updateLikesView();
  }

  _updateLikesView() {
    this._isLiked = this.isLikedByUser();
    if (this._isLiked) {
      this._likeButton.classList.add("gallery__like-button_active");
    } else {
      this._likeButton.classList.remove("gallery__like-button_active");
    }
    this._likeCounter.textContent = this._likes.length;
  }

  /*проверить клиента сайта*/

  _isOwner() {
    if (this._owner === this._currentUserId) {
      return true;
    }
  }

  /*возвращение разметки*/

  _getTemplate() {
    const cardElement = this._templateSelector.content
      .querySelector(".gallery__card")
      .cloneNode(true);
    return cardElement;
  }

  deleteThisCard() {
    this._element.remove();
    this._element = null;
  }

  /*сгенерировать карточку*/

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".gallery__image");
    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._deleteButton = this._element.querySelector(".gallery__delete-button");
    this._currentUserId = localStorage.getItem("userId");
    this._currentUserLikeId = localStorage.getItem("userId");

    this._likeCounter = this._element.querySelector(
      ".gallery__like-button-counter"
    );

    this._cardImage.src = this._link;
    this._element.querySelector(".gallery__card-title").textContent =
      this._title;
    this._element.querySelector(".gallery__image").alt = this._title;

    if (this._card.owner._id !== this._userId) {
      this._deleteButton.classList.add("gallery__delete-button_inactive");
    }
    this._updateLikesView();
    this._setEventListener();
    return this._element;
  }

  /*установить слушатель*/

  _setEventListener() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick({ name: this._card.name, link: this._card.link });
    });
    this._deleteButton.addEventListener("click", () => {
      this._deletePopupConfirm(this._cardId, this._element);
    });
    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeClick(evt, this._cardId, this);
    });
  }
}
