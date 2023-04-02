class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened')
  }

  close() {
    this._popup.classList.remove('popup_opened')
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const submitBtn = this._popup.querySelector('.popup__close');
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === submitBtn || evt.target === this._popup) {
        this.close();
      }
    })
  }
}
