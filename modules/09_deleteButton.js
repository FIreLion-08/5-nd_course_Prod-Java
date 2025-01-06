// Удаление последнего комментария

import commentsArray from './02_commentsArray.js'
import renderComments from './06_renderComments.js'

function deleteLastComment() {
    if (commentsArray.length > 0) {
        commentsArray.pop()
        renderComments()
    }
}

export default deleteLastComment
// Удаление последнего комментария
