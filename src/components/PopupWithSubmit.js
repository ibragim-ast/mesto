export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
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
