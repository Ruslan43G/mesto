
const popUp = document.querySelector('.profile__edit-btn'); // выбираем кнопку редактировать в профиле
const pop = document.querySelector('.popup'); // выбираем блок poup для редактирования профиля
const popClose = document.querySelector('.popup__icon-close'); // выбираем кнопку закрытия формы реактирования профиля 
const nameInput = document.querySelector('.popup__name'); // выбираем форму ввода имени в попапе редактирования профиля
const jobInput = document.querySelector('.popup__about'); // выбираем форму ввода о себе в попапе реадктирования профиля
const name = document.querySelector('.profile__name'); // выбор имени в профиле
const job = document.querySelector('.profile__about');  // выбор професии в профиле
const formElement = document.querySelector('.popup__container'); // Находим форму редактирования профиля в DOM
const elements = document.querySelector('.elements'); // находим в DOM блок elements.
const cardBtn = document.querySelector('.profile__add-btn'); // находим в DOM кнопку добавления карточки.
const popupCard = document.querySelector('.popup-card'); // находим в DOM блок Попап добавления карточки
const cardPopupCloseBtn = document.querySelector('.popup-card__icon-close'); // находим в DOM кнопку закрытия попапа.
const cardNameInput = document.querySelector('.popup-card__name'); // находим в DOM поле ввода назания карточки.
const cardUrlInput = document.querySelector('.popup-card__about'); // находим в DOM поле ввода ссылки на кратинку.
const cardSavebtn = document.querySelector('.popup-card__button'); // Находим в DOM кнопку сохранения карточки.
const formCardElement = document.querySelector('.popup-card__container'); // Находим в DOM форму попапа карточки.
const popupImage = document.querySelector('.popup-img'); // попап с картинкой
const popupImageCloseBtn = document.querySelector('.popup-img__icon-close'); // кнопка закрытия попапа с картинкой.

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

// функция открытия и закрытия попапов.

function toggleAnyPop (elem) {             // elem = необходимый попап.
    elem.classList.toggle('popup_opened');  // удаление/добавление модификатора у нужного попапа.
}

// Функция для просмотра картинки в попапе.

function zoomCardImage (evt) {
    toggleAnyPop(popupImage);         // открываем попап с картинкой.  
    popupImage.querySelector('.popup-img__image').src = evt.target.src;  // добавляем URL картинки 
    popupImage.querySelector('.popup-img__text').textContent = evt.target.alt;  // добавляем заголовок    
};

// функция постановки лайка

function toogleLike (evt) {             
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
        toogleLike(evt);
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
    const cardDeleteBtn = elementsItem.querySelector('.elements__trash'); // Находим кнопку удалить
    const likeBtn = elementsItem.querySelector('.elements__like'); // Находим кнопку лайк.
    const cardImg = elementsItem.querySelector('.elements__img'); // выбрали картинку
    const cardTitle = elementsItem.querySelector('.elements__title'); // выбрали текст картинки

    cardImg.src = link; // Добавляем ссылку на картинку из массива
    cardImg.alt = name; // Добавляем картинке атрибут ALT
    cardTitle.textContent = name; // Добавляем заголовок из массива

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
    
    toggleAnyPop(pop); // Закрываем попап
};


// Функция создания добавления нового объекта в массив из формы добавления новой карточки.

function userAddElemnt (evt) {
    evt.preventDefault();   // отменяем стандартный сабмит для формы.
    const newCardData = {};  // создём новый объект
    newCardData.name = cardNameInput.value; // Записываем в имя объекта название из поля ввода имени в форме.
    newCardData.link = cardUrlInput.value; // Записываем ссылку в объект из поля вводы ссылки в форме. 
    initialCards.push(newCardData); // вставляем объект в конец массива с карточками
    elements.prepend(addElement(initialCards[initialCards.length -1].link, initialCards[initialCards.length -1].name)); // вызываем функцию создания карточки и вставляем данные из последнего объекта массива.
    toggleAnyPop(popupCard); // вызываем функцию закрытия формы добавления карточки.
};

formElement.addEventListener('submit', formSubmitHandler); // слушатель события “submit” - «отправка» в форме редактирования профиля.

popUp.addEventListener('click', () => toggleAnyPop(pop)); // ловим клик по кнопке редактирования и открываем popup

popClose.addEventListener('click', () => toggleAnyPop(pop)); // ловим клик по кнопке закрытия попапа и закрываем его функцией     

formCardElement.addEventListener('submit', userAddElemnt); // навешиваем слушатель события сабмит на форму добавения карточки.
 
cardBtn.addEventListener('click', () => toggleAnyPop(popupCard)); // Слушатель клика для кнопки добавить карточку в профиле пользователя.

cardPopupCloseBtn.addEventListener('click', () => toggleAnyPop(popupCard)); // Слушатель кника для кнопки закрытия попапа редактирования карточки.

popupImageCloseBtn.addEventListener('click',  () => toggleAnyPop(popupImage)); //  Слушатель клика для закрытия попапа с картинкой по кнопке закрыть.









