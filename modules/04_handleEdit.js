// Редактирование комментариев
import { commentsArray } from './02_commentsArray.js'
import renderComments from './06_renderComments.js'

const handleEdit = (index) => {
    commentsArray[index].paint = true
    // Переписываем комментарии
    renderComments()
}

export default handleEdit
