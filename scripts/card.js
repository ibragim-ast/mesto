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

  _setEventListeners() {
    this._element.querySelector('click', () => {
      this._myFunc();
    });

  }


}

export default Card
