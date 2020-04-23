
const popUp = document.querySelector('.profile__edit-btn'); // выбираем кнопку редактировать
const pop = document.querySelector('.popup'); // выбираем блок poup 
const popClose = document.querySelector('.popup__icon-close'); // выбираем кнопку закртия popup
const nameInput = document.querySelector('.popup__name'); // выбираем форму ввода имени в попапе
const jobInput = document.querySelector('.popup__about'); // выбираем форму ввода о себе в попапе

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
// выбор ДОМ элементов
const elements = document.querySelector('.elements'); //находим в DOM блок elements.
const cardBtn = document.querySelector('.profile__add-btn'); // находим в DOM кнопку добавления карточки.
const popupCard = document.querySelector('.popup-card'); // находим в DOM блок Попап добавления карточки
const cardPopupCloseBtn = document.querySelector('.popup-card__icon-close'); // находим в DOM кнопку закрытия попапа.
const cardNameInput = document.querySelector('.popup-card__name'); // находим в DOM поле ввода назания карточки.
const cardUrlInput = document.querySelector('.popup-card__about'); // находим в DOM поле ввода ссылки на кратинку.
const cardImage = document.querySelector('.elements__img'); // Находим в DOM место для картинки в карточке.
const cardName = document.querySelector('.elements__title'); // Находим в DOM место для названия карточки.
const cardSavebtn = document.querySelector('.popup-card__button'); // Находим в DOM кнопку сохранения карточки.
const formCardElement = document.querySelector('.popup-card__container'); // Находим в DOM форму попапа карточки.
const popupImage = document.querySelector('.popup-img'); // попак с картинкой
const popupImageCloseBtn = document.querySelector('.popup-img__icon-close'); // кнопка закрытия попапа с картинкой.


//------------------------------------------------------------------
//Вывод на страницу изначальных карточек из массива.

initialCards.forEach(function (item) {
    const template = document.querySelector('#template').content; //находим в DOM шамблон с карточкой.
    const elementsItem = template.cloneNode(true); //клонируем шаблон карточки.
    elementsItem.querySelector('.elements__img').src = item.link; //Добавляем ссылку на картинку
    elementsItem.querySelector('.elements__title').textContent = item.name; // Добавляем заголовок
    const cardDeleteBtn = elementsItem.querySelector('.elements__trash'); // Находим кнопку удалить
    cardDeleteBtn.addEventListener('click', function(evt) {               // Добавляем кнопке слушатель с функцией удаления карточки
         evt.target.parentElement.remove();  
    });
    const likeBtn = elementsItem.querySelector('.elements__like'); // Находим кнопку лайк.
    likeBtn.addEventListener('click', function(evt) {             // Добавляем кнопке слушатель с функцией постановки лайка.
        evt.target.classList.toggle('elements__like_active');
    });
    const cardImg = elementsItem.querySelector('.elements__bg'); // выбрали картинку
    const cardTitle = elementsItem.querySelector('.elements__title'); // выбрали текст картинки

    cardImg.addEventListener('click', function() {
        popupImage.classList.add('popup_opened');         // открываем попап с картинкой.  
        popupImage.querySelector('.popup-img__image').src = item.link;  // добавляем URL картинки 
        popupImage.querySelector('.popup-img__text').textContent = item.name;  // добавляем заголовок
    });

    elements.append(elementsItem); //выводим на страницу
});

// функция открытия и закрытия попапа карточки.
function cardPopupToggle() {
    if (popupCard.classList.contains('popup_opened')) {  // проверка наличия модификатора
        popupCard.classList.remove('popup_opened');      // удаляет при наличии
    } else { 
        popupCard.classList.add('popup_opened');         // добавляет при отсутсвии  
    }
};

// Функция добавления карточки пользователем.

function userAddCard (evt) {
    evt.preventDefault();  // отменяем дефолтный сабмит
    const template = document.querySelector('#template').content; //находим в DOM шамблон с карточкой.
    const elementsItem = template.cloneNode(true); //клонируем шаблон карточки.
    elementsItem.querySelector('.elements__img').src = cardUrlInput.value; //Добавляем ссылку на картинку
    elementsItem.querySelector('.elements__title').textContent = cardNameInput.value; // Добавляем заголовок
    const cardDeleteBtn = elementsItem.querySelector('.elements__trash'); // Находим кнопку удалить
    cardDeleteBtn.addEventListener('click', function(evt) {               // Добавляем кнопке слушатель с функцией удаления карточки
         evt.target.parentElement.remove();  
    });
    const likeBtn = elementsItem.querySelector('.elements__like'); // Находим кнопку лайк.
    likeBtn.addEventListener('click', function(evt) {              // Добавляем кнопке слушатель с функцией постановки лайка.
        evt.target.classList.toggle('elements__like_active');
    
    });

    const cardImg = elementsItem.querySelector('.elements__bg'); // выбрали картинку
    const cardTitle = elementsItem.querySelector('.elements__title'); // выбрали текст картинки

    cardImg.addEventListener('click', function() {
        console.log('click');
        popupImage.classList.add('popup_opened');         // открываем попап с картинкой.  
        popupImage.querySelector('.popup-img__image').src =  cardUrlInput.value;  // добавляем URL картинки 
        popupImage.querySelector('.popup-img__text').textContent = cardNameInput.value;  // добавляем заголовок
    });

    elements.prepend(elementsItem); // выводим на страницу
    cardPopupToggle(); // закрываем
};

formCardElement.addEventListener('submit', userAddCard); //


// слушатели событий. 
cardBtn.addEventListener('click', cardPopupToggle); // кнопка открыть. 
cardPopupCloseBtn.addEventListener('click', cardPopupToggle); // кнопка закрыть.

popupImageCloseBtn.addEventListener('click', function() {
    popupImage.classList.remove('popup_opened');      // Закрываем попап с картинкой
});









