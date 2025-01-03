// 5.6 Модульный JS и npm
"use strict";

const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const deleteButtonElement = document.getElementById("delete-button");

// Установка формата даты ДД.ММ.ГГГГ ЧЧ:ММ

// const date = new Date();
// const formattedDate =
//   date.getDate().toString().padStart(2, "0") +
//   "." +
//   (date.getMonth() + 1).toString().padStart(2, "0") +
//   "." +
//   date.getFullYear().toString().slice(-2) +
//   " " +
//   date.getHours().toString().padStart(2, "0") +
//   ":" +
//   date.getMinutes().toString().padStart(2, "0");

// Функция безопасности ввода данных
function replaceText(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Массив комментариев
const commentsArray = [
  {
    name: "Глеб Фокин",
    date: "12.02.22 12:18",
    comment: "Это будет первый комментарий на этой странице",
    like: 3,
    userLike: false,
    paint: false,
  },
  {
    name: "Варвара Н.",
    date: "13.02.22 19:22",
    comment: "Мне нравится как оформлена эта страница! ❤",
    like: 74,
    userLike: false,
    paint: false,
  },
];

// Добавление и удаление лайков
const likes = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((el, index) => {
    el.addEventListener("click", (event) => {
      event.stopPropagation();
      commentsArray[index].userLike = !commentsArray[index].userLike;
      commentsArray[index].userLike
        ? commentsArray[index].like++
        : commentsArray[index].like--;

      // Переписываем комментарии
      renderComments();
    });
  });
};

// Редактирование комментариев
const handleEdit = (index) => {
  commentsArray[index].paint = true;
  // Переписываем комментарии
  renderComments();
};

// Сохранение отредактированного комментария
const handleSave = (index) => {
  // Получаем отредактированный комментарий
  console.log(index);
  const editedComment = listElement
    .querySelectorAll(".comment")
    [index].querySelector(".comment-input").value;

  // Обновляем комментарий в массиве
  commentsArray[index].comment = editedComment;
  // Устанавливаем флаг редактирования в false
  commentsArray[index].paint = false;
  // Переписываем комментарии
  renderComments();
};

// Добавление комментариев
const renderComments = () => {
  const commentsHtml = commentsArray
    .map((item, index) => {
      if (item.paint) {
        return `<li class="comment" data-paint='${item.paint}'>
          <div class="comment-header">
            <div>${item.name}</div>
            <div>${item.date}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              <textarea class="comment-input add-text" rows="4">${item.comment}</textarea>
              <button data-index='${index}' class="save-buttons add-form-button saving">Сохранить</button>
            </div>
          </div>
        </li>`;
      } else {
        return `<li class="comment" data-paint='${item.paint}'>
          <div class="comment-header">
            <div class="comment-name">${item.name}</div>
              <div>${item.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                <span class="comment-content">${item.comment}</span>
                <button data-index='${index}' class="edit-button add-form-button">Редактировать</button>
              </div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${item.like}</span>
                <button class="like-button ${
                  item.userLike ? "-active-like" : ""
                }"></button>
              </div>
            </div>
        </li>`;
      }
    })
    .join("");

  listElement.innerHTML = commentsHtml;
  likes();
  // Привязка обработчиков событий для кнопок редактирования
  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      handleEdit(button.dataset.index);
    });
  });
  // Привязка обработчиков событий для кнопок сохранения
  document.querySelectorAll(".save-buttons").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      handleSave(button.dataset.index);
    });
  });

  // Ответ на комментарий
  const commentElements = document.querySelectorAll(".comment");
  commentElements.forEach((comment) => {
    comment.addEventListener("click", (event) => {
      if (comment.dataset.paint) {
        const author = comment.querySelector(
          ".comment-header .comment-name"
        ).textContent;
        const text = comment.querySelector(
          ".comment-text .comment-content"
        ).textContent;
        event.stopPropagation();

        // Формируем ответную цитату для вставки в поле комментария
        const quotedText = `> ${text}\n\n @${author}, `;
        document.getElementById("comment-input").value = quotedText;
        renderComments();
      }
    });
  });
};

// Инициализация рендеринга комментариев
renderComments();

// Условие неактивной кнопки
function noButton() {
  buttonElement.disabled = true;
  const checkButtonState = () => {
    buttonElement.disabled =
      nameInputElement.value === "" || commentInputElement.value === "";
  };
  nameInputElement.addEventListener("input", checkButtonState);
  commentInputElement.addEventListener("input", checkButtonState);
}
noButton();

// Функция клика, валидация
buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
  buttonElement.classList.remove("disabled-button");

  nameInputElement.value = nameInputElement.value.trim();
  commentInputElement.value = commentInputElement.value.trim();

  if (nameInputElement.value === "" || commentInputElement.value === "") {
    nameInputElement.classList.add("error");
    commentInputElement.classList.add("error");
    buttonElement.classList.add("disabled-button");
    return;
  }

  // Установка формата даты ДД.ММ.ГГГГ ЧЧ:ММ
  const date = new Date();
  const formattedDate =
    date.getDate().toString().padStart(2, "0") +
    "." +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "." +
    date.getFullYear().toString().slice(-2) +
    " " +
    date.getHours().toString().padStart(2, "0") +
    ":" +
    date.getMinutes().toString().padStart(2, "0");

  commentsArray.push({
    name: replaceText(nameInputElement.value),
    date: formattedDate,
    comment: replaceText(commentInputElement.value),
    like: 0,
    userLike: false,
    paint: false,
  });
  renderComments();
  nameInputElement.value = "";
  commentInputElement.value = "";
  buttonElement.disabled = true;
});

// Удаление последнего комментария
deleteButtonElement.addEventListener("click", () => {
  if (commentsArray.length > 0) {
    commentsArray.pop();
    renderComments();
  }
});

// Нажатие для ввода ENTER
document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    buttonElement.click();
  }
});
