// выбираем кнопку редактировать
const popUp = document.querySelector('.profile__edit-btn'); 
// выбираем блок poup
const pop = document.querySelector('.popup');
// выбираем кнопку закртия popup 
const popClose = document.querySelector('.popup__icon-close');
// выбираем форму ввода имени в попапе
const nameInput = document.querySelector('.popup__name');
// выбираем форму ввода профессии в попапе
const jobInput = document.querySelector('.popup__about');
// выберием элемент, куда вставлять имя из поля ввода
const name = document.querySelector('.profile__name');
// выберием элемент, куда вставлять профессию из поля ввода
const job = document.querySelector('.profile__about'); 
// функция для открытия попапа. Добавляет модификатор _opened со значением display: flex
function editOpener() {
    pop.classList.add('popup_opened');     
} 
 // функция для закрытия попапа, она удаляет модификатор _opened у элемента с классом popup
function popUpClose() {
    pop.classList.remove('popup_opened');  
}
// Находим форму в DOM
const formElement = document.querySelector('form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.  
    // Вставляем новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Закрываем попап
    pop.classList.remove('popup_opened')
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// ловим клик по кнопке редактирования и открываем popup
popUp.addEventListener('click', editOpener);
// ловим клик по кнопке закрытия попапа и закрываем его  
popClose.addEventListener('click', popUpClose);   



