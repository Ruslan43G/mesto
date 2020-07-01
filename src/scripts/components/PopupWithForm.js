import Popup from './Popup.js';

export default class PopupWithForm extends Popup {

    constructor (selector, formSubmit) {
        super(selector);
        this._formSubmit = formSubmit;
    }

    close() {
        super.close();
        this._popup.querySelector('form').reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.querySelector('form').addEventListener('submit', (evt) => this._handleSubmitForm(evt));
    }

    _handleSubmitForm(evt) {
        evt.preventDefault();
        this._formSubmit(this._getInputValues());   
    }

    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._popup.querySelectorAll('.popup__input');
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объет значения всех полей
        this._inputList.forEach(input => {
          this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;
    }

}