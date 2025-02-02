// Функция для получения комментариев с API
// Берем данные из массива с помощью GET и загружаем на сервер
export function fetchComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/Dmitry-Avdoshkin/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Реакция сети была не в порядке')
            }
            return response.json()
        })
        .then((responseData) => {
            // Приведение к нужному формату данных
            const formatComments = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    comment: comment.text,
                    date: new Date().toLocaleString().slice(0, -3),
                    like: comment.likes,
                    user_Like: false,
                }
            })
            console.log(formatComments)
            return formatComments // Возвращаем отформатированные комментарии
        })
}
