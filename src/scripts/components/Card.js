export default class Card {                                                                       // создаём класс для карточки

    constructor ({link, name, likes, _id, owner}, handleCardClick, selector, putLike, deleteLike, deleteCard) {                                                 // объявляем конструктор с данными и селектором
        this._link = link;
        this._name = name;
        this._likes = likes;
        this._id = _id;
        this._handleCardClick = handleCardClick;
        this._selector = selector;
        this._putLike = putLike;
        this._deleteLike = deleteLike;
        this._owner = owner;
        this._deleteCard = deleteCard;
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
        if (evt.target.classList.contains('elements__like_active')) {
            evt.target.classList.remove('elements__like_active');  // удалем модификатор
            this._element.querySelector('.elements__like-counter').textContent = this._likes.length -= 1;
            this._deleteLike(this._id);
            return;
        } 
        evt.target.classList.add('elements__like_active');  // добавляем модификатор
        this._putLike(this._id);
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length += 1;
    };
    
    // функция удаления картчоки
    _cardDelete () {    
        this._deleteCard(); // коллбэк для удаления карточки с сервера
        this._element.removeEventListener('click', this._cardHandler); // удаляем слушатели
    };

    // функция определяет клики по карточке
    _cardClickHandler (evt) {
        if (evt.target.classList.contains('elements__like')) {   // лайк
            this._toggleLike(evt);
        }
        if (evt.target.classList.contains('elements__img')) {   // попап с картинкой
            this._handleCardClick({link : this._link, name: this._name});
        }
        if (evt.target.classList.contains('elements__trash')) {  // удаление
            this._cardDelete();
        } 
    };

    // функция устанавливает слушатель на карточку
    _setCardEventListeners() {
        this._cardHandler = this._cardClickHandler.bind(this);
        this._element.addEventListener('click', this._cardHandler);
    }

    // метод проверяет отправителя карточки и скрывает иконку удаления
    _checkCardOwner (ownerId) {
        if (ownerId === '523c9085d438a93b559aa772') {
            return; 
        } else {
            this._element.querySelector('.elements__trash').classList.add('elements__trash_hidden');
        }
    }

    // метод проверяет если лайк поставил я, то накидывает модификатор.
    _checkLikeOwner() {
        if (this._likes.find(item => item._id === '523c9085d438a93b559aa772')) {
            this._element.querySelector('.elements__like').classList.add('elements__like_active');
        }
    }

    // метод наполняет карточку данными
    generateCard() {
        this._getCardTemplate();                                      // получаем разметку
        this._setCardEventListeners();                                // устанавливаем слушатели
        this._element.querySelector('.elements__img').src = this._link;  // вставляем картинку
        this._element.querySelector('.elements__img').alt = this._name;  // устанавливаем значение атрибута alt
        this._element.querySelector('.elements__like-counter').textContent = this._likes.length; // счётчик лайков
        this._element.querySelector('.elements__title').textContent = this._name; // вставляем название
        this._element.dataset.owner = this._owner._id;
        this._element.dataset.id = this._id;
        this._checkLikeOwner();
        this._checkCardOwner(this._owner._id);
        this._element.id = this._id; // устанавливаем id
        return this._element;    // возвращаем готовую карточку
    }
}