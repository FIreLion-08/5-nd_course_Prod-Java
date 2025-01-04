// Сохранение отредактированного комментария

import commentsArray from "./02_commentsArray.js";
import renderComments from "./06_renderComments.js";

const listElement = document.getElementById("list");

const handleSave = (index) => {
    // Получаем отредактированный комментарий
    // console.log(index);
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

export default handleSave;
