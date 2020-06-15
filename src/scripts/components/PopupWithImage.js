import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    open(evt) {
        super.open();
        this._popup.querySelector('.popup__image').src = evt.target.src;
        this._popup.querySelector('.popup__img-text').textContent = evt.target.alt;
    }
}