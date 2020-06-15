// класс для управления попапом

export default class Popup {
    constructor (selector) {                                 // конструктор принимает селектор попапа
        this._popup = document.querySelector(selector);      // Находит его в DOM
    }

    open() {                                                 // метод открытия попапа
        this._popup.classList.add('popup_opened');
        this._setEventListeners();
    }

    close() {                                               // метод закрытия попапа
        this._popup.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {                                  
        if (evt.key === 'Escape') {                             // если нажали на клавишу esc    
            this.close();  
        };
    }

    _setEventListeners() {                                  // метод установки слушателей на попап
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === this._popup) {
                this.close();
            }
            if (evt.target.classList.contains('popup__icon-close')) {
                this.close();
            }
        })
        document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
    }
}