import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(item) {
    this._inputList.forEach((input) => {
      input.value = item[input.name]
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}

export default PopupWithForm;
