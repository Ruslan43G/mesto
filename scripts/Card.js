import {openAnyPop, popupImage} from './index.js';                                  // импорт функции для открытия попапа и переменной попапа с картинкой

export class Card {                                                                       // создаём класс для карточки
    constructor (data, selector) {                                                 // объявляем конструктор с данными и селектором
        this._link = data.link;
        this._name = data.name;
        this._selector = selector;
    }

    _getCardTemplate() {
        const elementsItem = document.
        querySelector(this._selector).
        content.
        querySelector('.elements__item').
        cloneNode(true);                                            // получаем карточку из шаблона
        this._element = elementsItem;
    }

    // функция для просмотра картинки в попапе
    _zoomCardImage (evt) {  
        document.querySelector('.popup__image').src = evt.target.src;  // добавляем URL картинки 
        document.querySelector('.popup__img-text').textContent = evt.target.alt;  // добавляем заголовок    
        openAnyPop(popupImage)         // открываем попап с картинкой.
    };
    
    // функция постановки лайка
    _toggleLike (evt) {             
        evt.target.classList.toggle('elements__like_active');  // добавляем или удалем модификатор 
    };
    
    // функция удаления картчоки
    _cardDelete (evt) {              
        evt.target.closest('.elements__item').remove();  // удаляем карточку
    };

    // функция определяет клики по карточке
    _cardClickHandler (evt) {
        if (evt.target.classList.contains('elements__like')) {   // лайк
            this._toggleLike(evt)  // добавляем или удалем модификатор 
        }
        if (evt.target.classList.contains('elements__img')) {   // попап с картинкой
            this._zoomCardImage(evt);
        }
        if (evt.target.classList.contains('elements__trash')) {  // удаление
            this._cardDelete(evt);
        }
    };

    // функция устанавливает слушатель на карточку
    _setCardEventListeners() {
        this._element.addEventListener('click', (evt) => this._cardClickHandler(evt))
    }

    // метод наполняет карточку данными
    generateCard() {
        this._getCardTemplate();                                      // получаем разметку
        this._setCardEventListeners();                                // устанавливаем слушатели
        this._element.querySelector('.elements__img').src = this._link;  // вставляем картинку
        this._element.querySelector('.elements__img').alt = this._name;  // устанавливаем значение атрибута alt
        this._element.querySelector('.elements__title').textContent = this._name; // вставляем название
        return this._element;    // возвращаем готовую карточку
    }
}