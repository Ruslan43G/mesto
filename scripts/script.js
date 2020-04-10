// выбираем кнопку редактировать
const popUp = document.querySelector('.profile__edit-btn'); 
// выбираем блок poup
const pop = document.querySelector('.popup');
// выбираем кнопку закртия popup 
const popClose = document.querySelector('.popup__icon-close');
// выбираем форму ввода имени в попапе
const nameInput = document.querySelector('.popup__name');
// выбираем форму ввода о себе8520/10 в попапе
const jobInput = document.querySelector('.popup__about');
// Выберите элементы, куда должны быть вставлены значения полей
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__about'); 
// функция для открытия/закрытия попапа. Добавляет у удаляет модификатор _opened со значением display: flex
function popUpToggle() {
    if (pop.classList.contains('popup_opened')) {  // проверка наличия модификатора
        pop.classList.remove('popup_opened');      // удаляет при наличии
    } else { 
        pop.classList.add('popup_opened');         // добавляет при отсутсвии  
    }
}
// Находим форму в DOM
const formElement = document.querySelector('form');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    // Вставьте новые значения с помощью textContent
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    // Закрываем попап
    popUpToggle();
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
// ловим клик по кнопке редактирования и открываем popup
popUp.addEventListener('click', popUpToggle);
// ловим клик по кнопке закрытия попапа и закрываем его функцией  
popClose.addEventListener('click', popUpToggle);   



