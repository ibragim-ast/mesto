const hiddenError = (errorElement, inputErrorClass) => {
  errorElement.innerText = '';
  errorElement.classList.remove(inputErrorClass);
};

const showError = (errorElement, message, inputErrorClass) => {
  errorElement.innerText = message;
  errorElement.classList.add(inputErrorClass);
};

const toggleInputState = (inputElement, options) => {
  const isValid = inputElement.validity.valid;
  const inputSectionElement = inputElement.closest(options.inputSectionSelector);
  const errorElement = inputSectionElement.querySelector(options.inputErrorSelector);
  if (isValid) {
    hiddenError(errorElement, options.inputErrorClass);
  } else {
    showError(errorElement, inputElement.validationMessage, options.inputErrorClass);
  };
};

const enableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(disabledButtonClass);
};

const disableButton = (buttonElement, disabledButtonClass) => {
  buttonElement.setAttribute('disabled', 'true');
  buttonElement.classList.add(disabledButtonClass);
};

const toggleButtonstate = (inputs, submitElement, disabledButtonClass) => {
  const formIsValid = inputs.every(inputElement => inputElement.validity.valid);

  if (formIsValid) {
    enableButton(submitElement, disabledButtonClass);
  } else {
    disableButton(submitElement, disabledButtonClass);
  };
};

const setEventListeners = (form, options) => {
  const submitElement = form.querySelector(options.submitSelector);
  const inputs = Array.from(form.querySelectorAll(options.inputSelector));

  inputs.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      toggleInputState(inputElement, options);
      toggleButtonstate(inputs, submitElement, options.disabledButtonClass);
    });
  });
  toggleButtonstate(inputs, submitElement, options.disabledButtonClass);
};

const enableValidation = (options) => {
  const forms = Array.from(document.querySelectorAll(options.formSelector));
  forms.forEach(form => {
    setEventListeners(form, options);
  });
};


