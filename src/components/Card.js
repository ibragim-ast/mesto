class Card {
  constructor({ dataCard }, templateSelector, userId, handleCardClick, hundleLikeCard, removeLikeCard) {
    this._title = dataCard.name;
    this._link = dataCard.link;
    this._cardId = dataCard.id;
    this._userId = userId;
    this._likesCount = dataCard._likes;
    this._likesArr = [];
    this._hundleLikeCard = hundleLikeCard;
    this._removeLike = removeLikeCard;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true)
  }

  _setData() {
    this._imageElement.src = this._link;
    this._imageElement.alt = this._title;
    this._titleElement.textContent = this._title;
    this._likesCount = this._likesArr.length;
    this._likes.textContent = this._likesCount;
    this._id = this._cardId;
    //console.log(this._likes)
    //console.log(this._likesArr)
    console.log(this._likesCount)
  }


  generateCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.card__title');
    this._imageElement = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likes = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__remove-button');
    this._setEventListeners();
    this._setData();
    return this._element
  }

  likedCard() {
    return this._likesArr.some(like => like._id === this._userId)
  };

  _handleLikeButton() {
    if (this.likedCard()) {
      this._removeLike(this._cardId)
    } else {
      this._hundleLikeCard(this._cardId)
    }
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _handleRemoveButton() {
    this._element.remove();
    this._element = null
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._handleLikeButton());

    this._deleteButton.addEventListener('click', () =>
      this._handleRemoveButton());

    this._imageElement.addEventListener('click', () =>
      this._handleCardClick(this._link, this._title));
  }
}

export default Card
