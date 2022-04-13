export const getToday = () => {
    const date = new Date();
    const year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) {
        month = "0" + month;
    }
    let day = date.getDate().toString();
    if (day.length < 2) {
        day = "0" + day;
    }
    const formattedDate = [year, month, day].join('-');
    return formattedDate;
}