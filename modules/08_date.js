// Установка формата даты ДД.ММ.ГГГГ ЧЧ:ММ (07_date.js)

function getFormattedDate() {
    const date = new Date();
    const formattedDate =
        date.getDate().toString().padStart(2, "0") + "." +
        (date.getMonth() + 1).toString().padStart(2, "0") + "." +
        date.getFullYear().toString().slice(-2) + " " +
        date.getHours().toString().padStart(2, "0") + ":" +
        date.getMinutes().toString().padStart(2, "0");

    return formattedDate; // Возвращаем отформатированную дату
}

export default getFormattedDate;
