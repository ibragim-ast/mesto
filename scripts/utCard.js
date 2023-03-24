class Card {
  constructor(dataCard, templateSelector, openPopupLargeImage) {
    this._title = dataCard.name;
    this._link = dataCard.link;
    this._templateSelector = templateSelector;
    this._openPopupLargeImage = openPopupLargeImage;
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
  }

  generateCard() {
    this._element = this._getTemplate();
    this._titleElement = this._element.querySelector('.card__title');
    this._imageElement = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__remove-button');
    this._setEventListeners();
    this._setData();
    return this._element
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle('card__like-button_active')
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
      this._openPopupLargeImage(this._link, this._title));
  }

}

export default Card
