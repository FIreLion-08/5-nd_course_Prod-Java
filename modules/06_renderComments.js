// Добавление комментариев
import replaceText from './01_replaceText.js'
import { commentsArray } from './02_commentsArray.js'
import likes from './03_likes.js'
import handleEdit from './04_handleEdit.js'
import handleSave from './05_handleSave.js'

// const nameInputElement = document.getElementById("name-input");
// const commentInputElement = document.getElementById("comment-input");
// const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById('list')

const renderComments = () => {
    const commentsHtml = commentsArray
        .map((item, index) => {
            if (item.paint) {
                return `<li class="comment">
            <div class="comment-header">
              <div>${replaceText(item.name)}</div>
              <div>${item.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">
                <textarea class="comment-input add-text" rows="4">${replaceText(item.comment)}</textarea>
                <button data-index='${index}' class="save-buttons add-form-button saving">Сохранить</button>
              </div>
            </div>
          </li>`
            } else {
                return `<li class="comment" data-paint='${item.paint}'>
            <div class="comment-header">
              <div class="comment-name">${replaceText(item.name)}</div>
                <div>${item.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text">
                  <span class="comment-content">${replaceText(item.comment)}</span>
                  <button data-index='${index}' class="edit-button add-form-button">Редактировать</button>
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${item.like}</span>
                  <button class="like-button ${
                      item.userLike ? '-active-like' : ''
                  }"></button>
                </div>
              </div>
          </li>`
            }
        })
        .join('')

    listElement.innerHTML = commentsHtml
    likes()
    // Привязка обработчиков событий для кнопок редактирования
    document.querySelectorAll('.edit-button').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            handleEdit(button.dataset.index)
        })
    })
    // Привязка обработчиков событий для кнопок сохранения
    document.querySelectorAll('.save-buttons').forEach((button) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            handleSave(button.dataset.index)
        })
    })

    // Ответ на комментарий
    const commentElements = document.querySelectorAll('.comment')
    commentElements.forEach((comment) => {
        comment.addEventListener('click', (event) => {
            if (comment.dataset.paint) {
                const author = comment.querySelector(
                    '.comment-header .comment-name',
                ).textContent
                const text = comment.querySelector(
                    '.comment-text .comment-content',
                ).textContent
                event.stopPropagation()

                // Формируем ответную цитату для вставки в поле комментария
                const quotedText = `> ${text}\n\n @${author}, `
                document.getElementById('comment-input').value = quotedText
                renderComments()
            }
        })
    })
}

export default renderComments
