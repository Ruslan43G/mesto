const popUp = document.querySelector('.profile__edit-btn'); // выбираем кнопку редактировать в профиле
const pop = document.querySelector('.popup'); // выбираем блок poup для редактирования профиля
const popClose = document.querySelector('.popup__icon-close'); // выбираем кнопку закрытия формы реактирования профиля 
const nameInput = document.querySelector('#profile-input-name'); // выбираем форму ввода имени в попапе редактирования профиля
const jobInput = document.querySelector('#profile-input-about'); // выбираем форму ввода о себе в попапе реадктирования профиля
const name = document.querySelector('.profile__name'); // выбор имени в профиле
const job = document.querySelector('.profile__about');  // выбор професии в профиле
const formElement = document.querySelector('#profile-form'); // Находим форму редактирования профиля в DOM
const elements = document.querySelector('.elements'); // находим в DOM блок elements.
const cardBtn = document.querySelector('.profile__add-btn'); // находим в DOM кнопку добавления карточки.
const popupCard = document.querySelector('.popup_card'); // находим в DOM блок Попап добавления карточки
const cardPopupCloseBtn = document.querySelector('#close-add-popap'); // находим в DOM кнопку закрытия попапа.
const cardNameInput = document.querySelector('#card-name-input'); // находим в DOM поле ввода назания карточки.
const cardUrlInput = document.querySelector('#card-url-input'); // находим в DOM поле ввода ссылки на кратинку.
const cardSavebtn = document.querySelector('#card-add-button'); // Находим в DOM кнопку сохранения карточки.
const formCardElement = document.querySelector('#card-form'); // Находим в DOM форму попапа карточки.
const popupImage = document.querySelector('.popup_image'); // попап с картинкой
const popupImageCloseBtn = document.querySelector('#close-img-popup'); // кнопка закрытия попапа с картинкой.
const popupOverlay = document.querySelectorAll('.popup'); // оверлей попапов

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

// функция открытия попапов

function openAnyPop (elem) {             // elem = необходимый попап.
    elem.classList.add('popup_opened');  // удаление/добавление модификатора у нужного попапа.
    document.addEventListener('keydown', function (evt) {  // слушаетль нажатия клавиши esc
        if (evt.key === 'Escape') {
            elem.classList.remove('popup_opened');    
        }
    });   
};

// функция закрытия попапов

function closeAnyPop (elem) {             // elem = необходимый попап.
    elem.classList.remove('popup_opened');  // удаление/добавление модификатора у нужного попапа.
    document.removeEventListener('keydown', function (evt) {  // слушаетль нажатия клавиши esc
        if (evt.key === 'Escape') {
            elem.classList.remove('popup_opened');    
        }
    });   
};


// Функция для просмотра картинки в попапе.

function zoomCardImage (evt) {
    openAnyPop(popupImage);         // открываем попап с картинкой.  
    popupImage.querySelector('.popup__image').src = evt.target.src;  // добавляем URL картинки 
    popupImage.querySelector('.popup__img-text').textContent = evt.target.alt;  // добавляем заголовок    
};

// функция постановки лайка

function toggleLike (evt) {             
    evt.target.classList.toggle('elements__like_active');  // добавляем или удалем модификатор 
};

// функция удаления картчоки

function cardDelete (evt) {               
    evt.target.parentElement.removeEventListener('click', setEventListeners); // удаляем слушатель с карточки
    evt.target.parentElement.remove();  // удаляем карточку
};

// функция устанавливает слушатель клика на карточку

function setEventListeners (evt) {
    if (evt.target.classList.contains('elements__like')) {   // лайк
        toggleLike(evt);
    };
    if (evt.target.classList.contains('elements__img')) {   // попап с картинкой
        zoomCardImage (evt);
    };
    if (evt.target.classList.contains('elements__trash')) {  // удаление
        cardDelete (evt);
    };
};


// Функция создания новой карточки.


function addElement (link, name) {
    
    const template = document.querySelector('#template').content; // находим в DOM шаблон с карточкой.
    const elementsItem = template.cloneNode(true); // клонируем шаблон карточки.
    const card = elementsItem.querySelector('.elements__item'); // находим карточку
    const cardImg = elementsItem.querySelector('.elements__img'); // выбрали картинку
    const cardTitle = elementsItem.querySelector('.elements__title'); // выбрали текст картинки

    cardImg.src = link; // Добавляем ссылку на картинку 
    cardImg.alt = name; // Добавляем картинке атрибут ALT
    cardTitle.textContent = name; // Добавляем заголовок

    card.addEventListener('click', setEventListeners); // устанавливаем слушатель событий на карточку
   
    return elementsItem;  // возвращаем разметку карточки
             
};

// Загрузка первоначальных 6 карточек на страницу из исходного массива.

initialCards.forEach(function (item) {
    elements.append(addElement(item.link, item.name)); 
}); 
 

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
    elements.prepend(addElement(cardUrlInput.value, cardNameInput.value)); // вызываем функцию создания карточки, вставляем данные из формы и выводим на странцу.
    closeAnyPop(popupCard); // вызываем функцию закрытия формы добавления карточки.
};


// слушатели 

formElement.addEventListener('submit', formSubmitHandler); // слушатель события “submit” - «отправка» в форме редактирования профиля.

popUp.addEventListener('click', () => openAnyPop(pop)); // ловим клик по кнопке редактирования и открываем popup

popClose.addEventListener('click',() => closeAnyPop(pop));  // ловим клик по кнопке закрытия попапа и закрываем его функцией
    
formCardElement.addEventListener('submit', userAddElemnt); // навешиваем слушатель события сабмит на форму добавения карточки.
 
cardBtn.addEventListener('click', () => openAnyPop(popupCard)); // Слушатель клика для кнопки добавить карточку в профиле пользователя.

cardPopupCloseBtn.addEventListener('click', () => closeAnyPop(popupCard)); // Слушатель кника для кнопки закрытия попапа редактирования карточки.

popupImageCloseBtn.addEventListener('click',  () => closeAnyPop(popupImage)); //  Слушатель клика для закрытия попапа с картинкой по кнопке закрыть.

popupOverlay.forEach(element => {
    element.addEventListener('click', (evt) => {                // слушатель клика на оверлеи попапов с функцией закрытия
         evt.target.classList.remove('popup_opened');   
    });
});

