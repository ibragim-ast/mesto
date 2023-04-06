class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._inputErrorClass = this._options.inputErrorClass;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
    this._submitElement = this._formElement.querySelector(this._options.submitSelector);
    this._disabledButtonClass = this._options.disabledButtonClass
  }

  _hiddenError(errorElement) {
    errorElement.innerText = '';
    errorElement.classList.remove(this._inputErrorClass);
  }

  _showError(errorElement, message) {
    errorElement.innerText = message;
    errorElement.classList.add(this._inputErrorClass);
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
    buttonElement.classList.remove(this._disabledButtonClass);
  }

  _disableButton(buttonElement) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(this._disabledButtonClass);
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
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._toggleInputState(inputElement);
        this._toggleButtonstate(this._inputList, this._submitElement);
      });
    });
    this._toggleButtonstate(this._inputList, this._submitElement);
    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._toggleButtonstate(this._inputList, this._submitElement);
      }, 0);
    });
  }

  clearFormErrors() {
    this._inputList.forEach(inputElement => {
      const inputSectionElement = inputElement.closest(this._options.inputSectionSelector);
      const errorElement = inputSectionElement.querySelector(this._options.inputErrorSelector);
      this._hiddenError(errorElement);
    });
    this._disableButton(this._submitElement);
  }


  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
