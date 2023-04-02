import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    const closeBtn = this._popup.querySelector('.popup__close');
    closeBtn.addEventListener('click', () => {
      this.close();
    });
  }
}

export default PopupWithImage;
