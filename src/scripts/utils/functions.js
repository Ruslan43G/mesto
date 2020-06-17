import {popupImage, errorSpan, formInput, forms} from './constants.js';
import FormValidator from '../components/FormValidator.js'

// функция обнуления ошибок
function errorClean (elem) {
    if (elem !== popupImage) {
        errorSpan.forEach((span) => {
            span.classList.remove('popup__error_visible');         // удаляем со спанов кмодификатор с ошибкой
            span.textContent = '';
        })
        formInput.forEach((input) => {
            input.classList.remove('popup__input_type_error');    // удаляем с инпутов модификатор с ошибкой
        })
        const formButton = elem.querySelector('.popup__button');
        formButton.disabled = true;                               // возвращаем кнопку в дефолтное состояние
        formButton.classList.add('popup__button_disabled');
    }
}

// функция находит формы и запускает на них процесс валидации.
function launchFormValidation () {  
    forms.forEach((form) => { 
        const valid = new FormValidator({              // создаем экземпляр клааса с валидацией
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
        }, form);
        valid.enableValidation();                    // вызываем в эеземпляре метод с запуском процесса валидации
    });
}

export {errorClean, launchFormValidation};