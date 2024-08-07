function getDates(value, params) { // Return starting date and ending date given input value
    switch (value) {
        case 'today':
            return getToday();
        case 'yesterday':
            return getYesterday();
        case 'last week':
            return getLastWeek();
        case 'last month':
            return getLastMonth();
    }
}

function getTodayObj() { // Return today's date set at midnight
    const today = new Date();
    today.setHours(0,0,0,0);
    return today;
}

function getToday() {
    const today = getTodayObj();
    return {startingDate: today, endingDate: today};
}

function getYesterday() { // Return yesterday's date set at midnight
    const yesterday = new Date(new Date().getFullYear(), 0, 1);
    yesterday.setDate(yesterday.getDate() - 1);
    return {startingDate: yesterday, endingDate: yesterday};
}

function getLastWeek() { // Return last week, Sun and Sat
    const today = getTodayObj();
    const dayOfWeek = today.getDay(); // 0-6 (Sun-Sat)

    const lastSunday = new Date(today.valueOf())
    lastSunday.setDate(today.getDate() - 7 - dayOfWeek); // Last Sunday will be 7 days away minus today's weekday

    const lastSaturday = new Date(lastSunday.valueOf())
    lastSaturday.setDate(lastSunday.getDate() + 6);

    return { startingDate: lastSunday, endingDate: lastSaturday };
}

function getLastMonth() { // Return last month's first and last day
    const today = getTodayObj();
    const year = today.getFullYear();
    const lastMonth = (today.getMonth() - 1) % 12; // Mod 12 so -1 (Month before January) loops back to 11 (December)
    const firstDay = new Date(year, lastMonth, 1);
    const lastDay = new Date(year, lastMonth + 1, 0); // Setting day as 0 for a month returns last day of the month before
    return { startingDate: firstDay, endingDate: lastDay };
}

export default getDates;