export default class Card {                                                                       // создаём класс для карточки

    constructor ({link, name}, handleCardClick, selector) {                                                 // объявляем конструктор с данными и селектором
        this._link = link;
        this._name = name;
        this._handleCardClick = handleCardClick;
        this._selector = selector;
    }

    _getCardTemplate() {
        const elementsItem = document.
        querySelector(this._selector).
        content.
        querySelector('.elements__item').
        cloneNode(true);                                            // получаем карточку из шаблона
        this._element = elementsItem;
        return this._element;
    }
    
    // функция постановки лайка
    _toggleLike (evt) {             
        evt.target.classList.toggle('elements__like_active');  // добавляем или удалем модификатор 
    };
    
    // функция удаления картчоки
    _cardDelete (evt) {              
        evt.target.closest('.elements__item').remove();  // удаляем карточку
        this._element.removeEventListener('click', this._cardHandler);
    };

    // функция определяет клики по карточке
    _cardClickHandler (evt) {
        if (evt.target.classList.contains('elements__like')) {   // лайк
            this._toggleLike(evt)  // добавляем или удалем модификатор 
        }
        if (evt.target.classList.contains('elements__img')) {   // попап с картинкой
            this._handleCardClick(evt);
        };

        if (evt.target.classList.contains('elements__trash')) {  // удаление
            this._cardDelete(evt);
        }
    };

    // функция устанавливает слушатель на карточку
    _setCardEventListeners() {
        this._cardHandler = this._cardClickHandler.bind(this);
        this._element.addEventListener('click', this._cardHandler);
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