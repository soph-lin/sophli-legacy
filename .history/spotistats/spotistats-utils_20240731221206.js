function getDates(value, params) { // Return starting date and ending date given input value
    switch (value) {
        case 'today':
            return day(getToday());
        case 'yesterday':
            
    }
}

function getToday() { // Return today's date set at midnight
    const today = new Date().setHours(0,0,0,0);
    return {startingDate: today, endingDate: today};
}

export {};