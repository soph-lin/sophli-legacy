function getDates(value, params) { // Return starting date and ending date given input value
    switch (value) {
        case 'today':
            return day(getToday())
    }
}

function day(date) { // Given Date day, return same starting date and ending date
    
}

function getToday() { // Return today's date set at midnight
    const date = new Date().setHours(0,0,0,0);
    return {startingDate: date, endingDate: date};
}

export {};