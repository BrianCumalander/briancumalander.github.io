function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1; // 👈️ months are 0-based

// 👇️ Current Month
const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);
//console.log(daysInCurrentMonth); // 👉️ 31


// this will return the range of days from 1 to daysInCurrentMonth in to an array
let days = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1)
//console.log(days);

let daysIncrement = () => {
    return (days.join(' ')); // removing the commas from the array output. Should also convert array to a string. 
}
daysIncrement();
//console.log(daysIncrement()); // 👉️ 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28
//console.log(typeof daysIncrement()); // 👉️ strng