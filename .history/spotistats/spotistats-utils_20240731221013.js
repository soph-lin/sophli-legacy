function getDates(value, params) { // Return starting date and ending date given input value
    switch (value) {
        case 'today':
            return {getToday}
    }
}

function getToday() { // Return today's date set at midnight
    return new Date().setHours(0,0,0,0);
}

export {};