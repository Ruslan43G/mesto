// функция для показа ошибки валидации

function showInputError (obj, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);       // выбираем спан элемнент куда выводим ошибку
    inputElement.classList.add(obj.inputErrorClass);                                   // добавляем полюю ввода модификатор со стилем ошибки
    errorElement.textContent = errorMessage;                                           // выводим сообщение об ошибке в спан элемент
    errorElement.classList.add(obj.errorClass);                                        // Добавлем спану модификатор со стилем ошибки
};

// функция для скрытия ошибки валидации

function hideInputError (obj, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);        // выбираем спан элемнент куда выводим ошибку
    inputElement.classList.remove(obj.inputErrorClass);                                 // удаляем у поля ввода модификатор со стилем ошибки
    errorElement.classList.remove(obj.errorClass);                                      // удаляем у спана модификатор со стилем ошибки
    errorElement.textContent = '';                                                      // убираем текст ошибки
};

// функция проверяет корректность введеных данных

function checkInputValidity (obj, formElement, inputElement) {
    if(!inputElement.validity.valid) {                                                        // если поле ввода не валидно
        showInputError(obj, formElement, inputElement, inputElement.validationMessage);       // выводим функцию показа ошибки
    } else {                                                                                  // если валидно
        hideInputError(obj, formElement, inputElement);                                       // выводим функцию спрятать ошибку
    };
};

// функция возвращает информацию о наличии ошибки валидации

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {                                               // если хотябы один инпут невалиден
        return !inputElement.validity.valid;                                                
    });
};

// функция включает и выключает кнопку отправить

function toggleButtonState (obj, inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {                                             // 
        buttonElement.classList.add(obj.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(obj.inactiveButtonClass);
        buttonElement.disabled = false;
    };
}

// функция устанавливает слушатели инпута на формы

function setFormEventListeners (obj, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(obj, inputList, buttonElement);

    inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
            checkInputValidity (obj, formElement, inputElement);
            toggleButtonState (obj, inputList, buttonElement);
        });
    });
};

// функция запускающая процесс валиации

function enableValidation (obj) {
   
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    
    formList.forEach((form) => {
        setFormEventListeners(obj, form);
    });

};

// включаем валидацию
enableValidation ({
    formSelector: '.popup__container',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

