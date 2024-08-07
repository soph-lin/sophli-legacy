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
    const today = new Date().setHours(0,0,0,0);
    return {startingDate: today, endingDate: today};
}

function getToday() {
    
}

function getYesterday() { // Return yesterday's date set at midnight
    const today = getToday();
    const yesterday = today.setDate(today.getDate() - 1);
    return {startingDate: yesterday, endingDate: yesterday};
}

function getLastWeek() { // Return last week, Sun and Sat
    const today = getToday();
    const dayOfWeek = today.getDay(); // 0-6 (Sun-Sat)
    const lastSunday = new Date(today.valueOf()).setDate(today.getDate() - 7 - dayOfWeek); // Last Sunday will be 7 days away minus today's weekday
    const lastSaturday = new Date(lastSunday.valueOf()).setDate(lastSunday.getDate() + 6);
    return { startingDate: lastSunday, endingDate: lastSaturday };
}

function getLastMonth() { // Return last month's first and last day
    const today = getToday();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Setting day as 0 for next month returns last day of the month before
    return { startingDate: firstDay, endingDate: lastDay };
}

export default getDates;