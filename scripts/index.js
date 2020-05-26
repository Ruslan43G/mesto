import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js'

const popUp = document.querySelector('.profile__edit-btn'); // выбираем кнопку редактировать в профиле
const pop = document.querySelector('.popup'); // выбираем блок poup для редактирования профиля
const nameInput = document.querySelector('#profile-input-name'); // выбираем форму ввода имени в попапе редактирования профиля
const jobInput = document.querySelector('#profile-input-about'); // выбираем форму ввода о себе в попапе реадктирования профиля
const name = document.querySelector('.profile__name'); // выбор имени в профиле
const job = document.querySelector('.profile__about');  // выбор професии в профиле
const formElement = document.querySelector('#profile-form'); // Находим форму редактирования профиля в DOM
const elements = document.querySelector('.elements'); // находим в DOM блок elements.
const cardBtn = document.querySelector('.profile__add-btn'); // находим в DOM кнопку добавления карточки.
const popupCard = document.querySelector('.popup_card'); // находим в DOM блок Попап добавления карточки
const cardNameInput = document.querySelector('#card-name-input'); // находим в DOM поле ввода назания карточки.
const cardUrlInput = document.querySelector('#card-url-input'); // находим в DOM поле ввода ссылки на кратинку.
const formCardElement = document.querySelector('#card-form'); // Находим в DOM форму попапа карточки.
export const popupImage = document.querySelector('.popup_image'); // попап с картинкой
const formInput = Array.from(document.querySelectorAll('.popup__input')); // создаем массив инпутов 
const errorSpan = Array.from(document.querySelectorAll('.popup__error')); // создаём массив спанов с ошибкой
const popups = Array.from(document.querySelectorAll('.popup')); // массив попапов


// Массив с данными для карточки при загрузке.
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// функция обнуления ошибок

function errorClean (elem) {

    if (elem !== popupImage) {

        errorSpan.forEach((span) => {
            span.classList.remove('popup__error_visible');         // удаляем со спанов кмодификатор с ошибкой
            span.textContent = '';
        })
    
        formInput.forEach((input) => {
            input.classList.remove('popup__input_type_error');    // удаляем с инпутов модификатор с ошибкой
        });

        const formButton = elem.querySelector('.popup__button');

        formButton.disabled = true;                               // возвращаем кнопку в дефолтное состояние
        formButton.classList.add('popup__button_disabled');
    }
};

// функция закрытия попапа по ESC

function escHandler (evt) {
    if (evt.key === 'Escape') {                             // если нажали на клавишу esc    
        popups.forEach((popup) => {                         // проходим по всем попапам
            if(popup.classList.contains('popup_opened')) {  // если попап содержит модификатор _opened  
                closeAnyPop(popup);                         // закрываем этот попап
            };
        });    
    };
};

// функция закрытия попапов

function closeAnyPop (elem) {             // elem = необходимый попап.
    elem.classList.remove('popup_opened');  // удаление/добавление модификатора у нужного попапа.
    document.removeEventListener('keydown', escHandler); // удаляем слушатель esc
    elem.removeEventListener('click', popupEventHandler); // удляем слушатели  с попапа  
};

// функция опредеения клиов на попапе

function popupEventHandler (evt) {
    
    if (evt.target.classList.contains('popup')) {    // если клик по оверлею
         closeAnyPop(evt.target)
    }  
    if (evt.target.classList.contains('popup__icon-close')) {   // если клик по кнопке закрыть
        closeAnyPop(evt.target.closest('.popup'));
    }

};

// функци добавленя слушателей на попап

function addPopupCloseListener (elem) {

    document.addEventListener('keydown', escHandler);   // устанавливаем слушатель esc

    elem.addEventListener('click', popupEventHandler);  // устанавливаем слушатель кликов
}

// функция открытия попапов

export function openAnyPop (elem) {             // elem = необходимый попап.
    
    elem.classList.add('popup_opened');  // удаление/добавление модификатора у нужного попапа.

    addPopupCloseListener (elem);   // установка слушателей закрытия попапов

    errorClean (elem);    // очистка ошибок формы
    

    if (elem !== popupImage) {                         // если попап не попап с картинкой, то
        const form = elem.querySelector('form');       // получаем форму в попапе      
        
        const valid = new FormValidator({              // создаем экземпляр клааса с валидацией
            formSelector: '.popup__container',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button',
            inactiveButtonClass: 'popup__button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__error_visible'
        }, form.id);

        valid.enableValidation();                    // вызываем в эеземпляре метод с запуском процесса валидации
    }
};

// Функция загрузки первоначальных 6 карточек на страницу из исходного массива.
function render () {
    
    initialCards.forEach(({link, name}) => {
       const card = new Card({link, name}, '#template');
       elements.append(card.generateCard()); 
    });
}    


// Обработчик «отправки» формы редактирования профиля.
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                                
    
    name.textContent = nameInput.value; // вставляем имя в профиль из формы ввода.
    job.textContent = jobInput.value; // вставляем профессию в профиль из формы ввода.
    
    closeAnyPop(pop); // Закрываем попап
};


// Функция создания и добавления новой карточки пользователем.

function userAddElemnt (evt) {
    evt.preventDefault();   // отменяем стандартный сабмит для формы.
    const obj = {}  // создаём новый объект
    obj.link = cardUrlInput.value;  // записываем в объект ключ link со значением из поля ввода ссылки на картинку
    obj.name = cardNameInput.value; // записываем в объект ключ name со значением из поля ввода названия карточки
    const card = new Card(obj, '#template');  // создаем экземпляр класса Card 
    elements.prepend(card.generateCard()); // вызываем функцию создания карточки, вставляем данные из формы и выводим на странцу.
    closeAnyPop(popupCard); // вызываем функцию закрытия формы добавления карточки.
};


// слушатели 

formElement.addEventListener('submit', formSubmitHandler); // слушатель события “submit” - «отправка» в форме редактирования профиля.

popUp.addEventListener('click', () => {       // ловим клик по кнопке редактирования профиля

    nameInput.value = name.textContent;         // записываем данные со страницы
    jobInput.value = job.textContent;
    
    openAnyPop(pop);                             // открываем попап

}); 

formCardElement.addEventListener('submit', userAddElemnt); // навешиваем слушатель события сабмит на форму добавения карточки.
 
cardBtn.addEventListener('click', () => openAnyPop(popupCard)); // Слушатель клика для кнопки добавить карточку в профиле пользователя.

render (); // вызываем функцию загрузки изначальных карточек
