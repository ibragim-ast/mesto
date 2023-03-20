const likeButton = document.querySelector('.card__like-button');

class Card {
  constructor(title, link, templateSelector, myFunc) {
    this._title = title;
    this._link = link;
    this._templateSelector = templateSelector;
    this._myFunc = myFunc;
  }

  _getTemplate() {
    const cardElement = document
      .getElementById('card-template')
      .content
      .querySelector('.card')
      .cloneNode(true)

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element
  }

  _handleLikeButton(event) {
    if (event.target.matches('.card__like-button')) {
      const cardToLike = event.target.closest('.card__like-button');
      cardToLike.querySelector('.card__like-button').classList.toggle('card_like-button_active');
    }
  }

  _handleRemoveButton(event) {
    if (event.target.classList.contains('card__remove-button')) {
      const cardToRemove = event.target.closest('.card');
      cardToRemove.remove();
    }
  }

  _setEventListeners() {
    this._element.addEventListener('click', () => {
      this._myFunc();
    });
    this._element.addEventListener('click', () => {
      this._handleLikeButton();
    })
    this._element.addEventListener('click', () => {
      this._handleRemoveButton();
    })
  }

}

export default Card
