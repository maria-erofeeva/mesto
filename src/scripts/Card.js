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

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._deletePopupConfirm = deletePopupConfirm;
  }

  /*обработка лайков*/

  handleLikeButton(data) {
    this._card.likes = data.likes;
    this._handleLike();
    this._countLikes();
    this._showCounterValue();
  }

  _handleLike() {
    this._likeButton.classList.toggle("gallery__like-button_active");
  }

  _showCounterValue() {
    this._likeCounter.innerText = this._card.likes.length;
  }

  isLikedByUser() {
    if (this._card.likes.includes(this._card.likes.owner._id)) {
      return true;
    }
  }

  _countLikes() {
    let counter = 0;
    this._likeCounter.innerHTML = '';
    this._likeCounter.innerHTML += ++counter;
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
    ).innerHTML;

    this._cardImage.src = this._link;
    this._element.querySelector(".gallery__card-title").textContent =
      this._title;
    this._element.querySelector(".gallery__image").alt = this._title;

    if (this._card.owner._id !== this._userId) {
      this._deleteButton.classList.add("gallery__delete-button_inactive");
    }
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
      this._handleLikeClick(evt, this._card);
    });
  }
}
