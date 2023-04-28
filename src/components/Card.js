class Card {
  constructor({ dataCard, templateSelector, handleCardClick, handleLikeCard, removeLikeCard, handleCardDelete }) {
    this._templateSelector = templateSelector;
    this._name = dataCard.name;
    this._link = dataCard.link;
    this._dataLikes = [];
    this._cardId = dataCard.cardId;
    this._userId = dataCard.userId;
    this._likesCounter = dataCard.likes.length;
    this._number = this._like;
    this._ownerId = dataCard.ownerId;
    this._handleLikeCard = handleLikeCard;
    this._removeLikeCard = removeLikeCard;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._like = dataCard.likes;
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
  }

  generateCard() {
    this._element = this._getTemplate();
    this._nameElement = this._element.querySelector('.card__title');
    this._imageElement = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likes = this._element.querySelector('.card__like-counter');
    this._likes.textContent = this._number;
    this._deleteButton = this._element.querySelector('.card__remove-button');
    this._setEventListeners();
    this._setData();
    this.showLikes(this._like);
    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    console.log(this._userId)
    if (this._like.some((like) =>
      like._id === this._userId
    )) {
      this._removeLikeCard(this._cardId)
    } else {
      this._handleLikeCard(this._cardId)
    }
  }

  showLikes(likes) {
    this._like = likes;
    this._numberLikes = likes.length;
    this._likes.textContent = this._numberLikes;
    likes = Array.from(likes);

    if (likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('card__like-button_active');
    } else {
      this._likeButton.classList.remove('card__like-button_active');
    }
  }

  handleDeleteCardButton() {
    this._handleCardDelete(this._cardId, this._element);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this.isLiked());

    this._deleteButton.addEventListener('click', () => this.handleDeleteCardButton());

    this._imageElement.addEventListener('click', () => this._handleCardClick(this._link, this._name));
  }
}

export default Card;
