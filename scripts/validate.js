// объект с настройками для валидации

const validData = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// функция для показа ошибки валидации

function showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validData.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validData.errorClass);
};

// функция для скрытия ошибки валидации

function hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validData.inputErrorClass);
    errorElement.classList.remove(validData.errorClass);
    errorElement.textContent = "";
};

// функция проверяет корректность введеных данных

function checkInputValidity (formElement, inputElement) {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    };
};

// функция возвращает информацию о наличии ошибки валидации

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

// функция включает и выключает кнопку отправить

function toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validData.inactiveButtonClass);
        buttonElement.setAttribute('disabled', 'disabled');
    } else {
        buttonElement.classList.remove(validData.inactiveButtonClass);
        buttonElement.removeAttribute('disabled', 'disabled');
    };
}

// функция устанавливает слушатели инпута на формы

function setFormEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(validData.inputSelector));
    const buttonElement = formElement.querySelector(validData.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity (formElement, inputElement);
            toggleButtonState (inputList, buttonElement);
        });
    });
};

// функция запускающия процесс валиации

function enableValidation () {
    const formList = Array.from(document.querySelectorAll(validData.formSelector));

    formList.forEach((form) => {
        setFormEventListeners(form);
    });

};

// включаем валидацию
enableValidation (validData);

