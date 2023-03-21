class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
  }

  _hiddenError(errorElement) {
    errorElement.innerText = '';
    errorElement.classList.remove(this._options.inputErrorClass);
  }

  _showError(errorElement, message) {
    errorElement.innerText = message;
    errorElement.classList.add(this._options.inputErrorClass);
  }

  _toggleInputState(inputElement) {
    const isValid = inputElement.validity.valid;
    const inputSectionElement = inputElement.closest(this._options.inputSectionSelector);
    const errorElement = inputSectionElement.querySelector(this._options.inputErrorSelector);
    if (isValid) {
      this._hiddenError(errorElement);
    } else {
      this._showError(errorElement, inputElement.validationMessage);
    }
  }

  _enableButton(buttonElement) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._options.disabledButtonClass);
  }

  _disableButton(buttonElement) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(this._options.disabledButtonClass);
  }

  _toggleButtonstate(inputs, submitElement) {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
    if (formIsValid) {
      this._enableButton(submitElement);
    } else {
      this._disableButton(submitElement);
    }
  }

  _setEventListeners() {
    const submitElement = this._formElement.querySelector(this._options.submitSelector);
    const inputs = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    inputs.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleInputState(inputElement);
        this._toggleButtonstate(inputs, submitElement);
      });
    });
    this._toggleButtonstate(inputs, submitElement);
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonstate(inputs, submitElement);
      }, 0);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
















