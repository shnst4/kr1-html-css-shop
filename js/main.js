// Получаем модальное окно по id (теперь можем закрыть/открыть).
const orderDialog = document.getElementById("order-dialog");

// Получаем все кнопки заказа в карточках товаров(Кнопка "Быстрый заказ").
const orderButtons = document.querySelectorAll(".product-card__button");

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById("close-order-dialog");

// Получаем скрытое поле, в которое будет записан выбранный товар(который заказали).
const selectedProductInput = document.getElementById("selected-product");

// Перебираем все кнопки "Быстрый заказ".
orderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener("click", () => {
  orderDialog.close();
});

// Получаем форму заявки.
const orderForm = document.getElementById("order-form");

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById("success-message");

// Обрабатываем отправку формы(submit срабатывает, когда нажимают кнпоку отправки формы).
orderForm.addEventListener("submit", (event) => {
  // Отменяем стандартную отправку формы(+ перезагрузку страницы), потому что бэк еще не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие ошибки (превращаем список полей формы в массив).
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      // Если участвует в валидации (поля required).
      element.removeAttribute("aria-invalid");
    }
  });

  // Проверяем валидность формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute("aria-invalid", "true");
      } // [aria-invalid="true"] рисует красную рамку.
    });

    // Показываем стандартные подсказки браузера("Заполните это поле").
    orderForm.reportValidity();
    return; // Форма отправится, только если пользователь исправил ошибки
  }

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;
  setTimeout(() => {
    successMessage.hidden = true;
  }, 3000); // Скроет сообщение через 3 секунды (отложенный вызов функции).

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});
