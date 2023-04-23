import Popup from "./Popup.js";
class PopupWithSubmit extends Popup {
  constructor({ popupSelector }) {
    super(document.querySelector(popupSelector));
    this._popupForm = this._popup.querySelector('.form');
  }

  handleSubmit(action) {
    this._submitHandler = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler();
    });
  }
}

export default PopupWithSubmit
