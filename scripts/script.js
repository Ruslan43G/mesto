// выбираем кнопку редактировать
const popUp = document.querySelector('.profile__edit-btn'); 
// выбираем блок poup
const pop = document.querySelector('.popup');
// выбираем кнопку закртия popup 
const popClose = document.querySelector('.popup__icon-close');
// выбираем форму ввода имени в попапе
const nameInput = document.querySelector('.popup__name');
// выбираем форму ввода о себе в попапе
const jobInput = document.querySelector('.popup__about');
// Выберите элементы, куда должны быть вставлены значения полей
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about'); 
// функция для открытия/закрытия попапа. Добавляет у удаляет модификатор _opened со значением display: flex
function popUpToggle() {
    if (pop.classList.contains('popup_opened')) {  // проверка наличия модификатора
        pop.classList.remove('popup_opened');      // удаляет при наличии
    } else { 
        pop.classList.add('popup_opened');         // добавляет при отсутсвии  
    }
}
// Находим форму в DOM
const formElement = document.querySelector('.popup__container');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                                
    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Закрываем попап
    popUpToggle();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// ловим клик по кнопке редактирования и открываем popup
popUp.addEventListener('click', popUpToggle);
// ловим клик по кнопке закрытия попапа и закрываем его функцией  
popClose.addEventListener('click', popUpToggle);   
//=======================================================================
const elements = document.querySelector('.elements'); //находим в DOM блок elements.

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

// цикл добавляет на страницу 6 карточек с картинками

for (let i = 0; i < 6; i++) {
    const template = document.querySelector('#template').content; //находим в DOM шамблон с карточкой.
    const elementsItem = template.cloneNode(true); //клонируем шаблон карточки.
    elementsItem.querySelector('.elements__img').src = initialCards[i].link //Добавляем ссылку на картинку
    elementsItem.querySelector('.elements__title').textContent = initialCards[i].name; // Добавляем заголовок
    elements.append(elementsItem); //выводим на страницу
};

// ПОПАП карточки.

const cardBtn = document.querySelector('.profile__add-btn'); // находим в DOM кнопку добавления карточки.
const popupCard = document.querySelector('.popup-card'); // находим в DOM блок Попап добавления карточки
const cardPopupCloseBtn = document.querySelector('.popup-card__icon-close'); // находим в DOM кнопку закрытия попапа.
const cardNameInput = document.querySelector('.popup-card__name'); // находим в DOM поле ввода назания карточки.
const cardUrlInput = document.querySelector('.popup-card__about'); // находим в DOM поле ввода ссылки на кратинку.
const cardImage = document.querySelector('.elements__img'); // Находим в DOM место для картинки в карточке.
const cardName = document.querySelector('.elements__title'); // Находим в DOM место для названия карточки.
const cardSavebtn = document.querySelector('.popup-card__button'); // Находим в DOM кнопку сохранения карточки.
const formCardElement = document.querySelector('.popup-card__container'); // Находим в DOM форму попапа карточки.
const cardDeleteBtn = document.querySelectorAll('.elements__trash'); // Находим в DOM кнопку удаления карточки.


// функция открытия и закрытия попапа карточки.
function cardPopupToggle() {
    if (popupCard.classList.contains('popup_opened')) {  // проверка наличия модификатора
        popupCard.classList.remove('popup_opened');      // удаляет при наличии
    } else { 
        popupCard.classList.add('popup_opened');         // добавляет при отсутсвии  
    }
}
// функция добавления карточки.
function cardAdd(evt) {
    evt.preventDefault();
    const template = document.querySelector('#template').content; //находим в DOM шамблон с карточкой.
    const elementsItem = template.cloneNode(true); //клонируем шаблон карточки.
    elementsItem.querySelector('.elements__img').src = cardUrlInput.value;  //Добавляем ссылку на картинку
    elementsItem.querySelector('.elements__title').textContent = cardNameInput.value; // Добавляем заголовок
    elements.prepend(elementsItem); //выводим на страницу
    cardPopupToggle();
}
// слушатели событий по кнопкам 
cardBtn.addEventListener('click', cardPopupToggle); // кнопка открыть. 
cardPopupCloseBtn.addEventListener('click', cardPopupToggle); // кнопка закрыть.
formCardElement.addEventListener('submit', cardAdd);
cardSavebtn.addEventListener('click', cardAdd);

// функция удаления карточек по клику на кнопку.
cardDeleteBtn.forEach(item => item.addEventListener('click', function() {
    const cardItem = item.closest('.elements__item');
    cardItem.remove();   
}));




