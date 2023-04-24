class Card {
  constructor({ dataCard, templateSelector, handleCardClick, handleLikeCard, removeLikeCard, handleCardDelete }) {
    this._templateSelector = templateSelector;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._dataLikes = dataCard.likes ? dataCard.likes : [];
    this._cardId = dataCard.cardId;
    this._userId = dataCard.userId;
    this._likesCounter = dataCard.likes.length;
    this._ownerId = dataCard.ownerId;
    this._handleLike = handleLikeCard;
    this._removeLike = removeLikeCard;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._templateSelector);
    const cardElement = templateElement.content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _setData() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    this._likesCounter = this._dataLikes.length;
    this._likes.textContent = this._likesCounter;
    this._cardId = this._cardId;

    if (this._dataLikes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }


  generateCard(userId) {
    this._element = this._getTemplate();
    this._nameElement = this._element.querySelector('.card__title');
    this._imageElement = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likes = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__remove-button');
    this._setEventListeners();
    this._setData();
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleLikeButton() {
    if (this._dataLikes.some(like => like._id === this._userId)) {
      this._removeLike(this._cardId);
      this._dataLikes = this._dataLikes.filter(like => like._id !== this._userId);
    } else {
      this._handleLike(this._cardId);
      this._dataLikes.push({ _id: this._userId });
    }
    this._likeButton.classList.toggle('card__like-button_active');
    this._likes.textContent = this._dataLikes.length;
  }


  _handleDeleteCardButton() {
    this._handleCardDelete(this._cardId, this._element);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButton());

    this._deleteButton.addEventListener('click', () => this._handleDeleteCardButton());

    this._imageElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }
}

export default Card;
