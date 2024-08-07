function getDates(value, params) { // Return starting date and ending date given input value
    switch (value) {
        case 'today':
            return day()
    }
}

function day(date) { // Given Date day, return same starting date and ending date
    return {startingDate: date, endingDate: date};
}

function getToday() { // Return today's date set at midnight
    return new Date().setHours(0,0,0,0);
}

export {};