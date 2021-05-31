const newDate = new Date();
const date = newDate.getDate();
const month = newDate.getMonth();
const year = newDate.getFullYear();

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];

const dates = `${date} ${months[month]} ${year}`;

export { dates };