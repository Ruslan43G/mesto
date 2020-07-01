// функция для отображения процесса загрузки
function textWhileLoading(isLoading, formSelector) {
    const formButton = document.querySelector(formSelector).querySelector('.popup__button');
    const text = formButton.name;
    if (isLoading) {
        formButton.textContent = 'Загрузка...';
    } else {
        formButton.textContent = text;
    }

}

export {textWhileLoading};