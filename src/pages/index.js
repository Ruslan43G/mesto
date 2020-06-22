import '../pages/index.css';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {popUp, 
    nameInput, 
    jobInput, 
    formElement, 
    cardBtn, 
    formCardElement, 
    initialCards} from '../scripts/utils/constants.js';
import {errorClean, launchFormValidation} from '../scripts/utils/functions.js';    

//создаем экземпляр UserInfo 
const userInfo = new UserInfo( {name: '.profile__name', job: '.profile__about'});

// создаем экземпляр попапа для редактировать профиль
const profilePopup = new PopupWithForm('.popup', (formData) => {
    //Записываем данные на страницу
    userInfo.setUserInfo(formData); 
});

//создаём экземпляр класса Section для отрисовки элементов.
const sectionRender= new Section({
    //запускаем функцию создния карточки 
    renderer: ({link, name}) => {
    //создаём экземпляр класса Card с данными из формы   
    const card = new Card({link, name}, ({link, name}) => imagePopup.open({link, name}), '#template');
    //Вставляем карточку в контейнер
    sectionRender.addItem(card.generateCard());
}}, '.elements');

// Ловим клик по кнопке редактирования профиля   
popUp.addEventListener('click', () => {
    //очищаем ошибки валидации в форме
    errorClean(formElement);
    //получем объект с данными пользователя со страницы
    const userData = userInfo.getUserInfo();
    //записываем данные в форму попапа
    nameInput.value = userData.name;
    jobInput.value = userData.job;
    //открываем попап
    profilePopup.open();
});

// создаём экземпляр класса попапа с картинкой
const imagePopup = new PopupWithImage('.popup_image');

// создаём экземпляр попапа для добавленя картоки
const addCardPopup = new PopupWithForm('.popup_card', (formData) => {
    //вызываем метод для отрисовкки карточек 
    sectionRender.renderItems([formData]);
    //закрываем попап
    imagePopup.close();
});

// ловим клик по кнопке добавления карточки
cardBtn.addEventListener('click', () => {
    //очищаем ошибки в форме
    errorClean(formCardElement);
    //открываем попап
    addCardPopup.open();
});

// Отрисовываем изначальные карточки
sectionRender.renderItems(initialCards);
// вызываем функцию для запуска валидации на формах.
launchFormValidation(); 

