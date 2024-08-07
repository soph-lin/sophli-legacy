function getDates(value, params) { // Return starting date and ending date given input value
    switch (value) {
        case 'today':
            return getToday();
        case 'yesterday':
            return 
    }
}

function getToday() { // Return today's date set at midnight
    const today = new Date().setHours(0,0,0,0);
    return {startingDate: today, endingDate: today};
}

function getYesterday() { // Return yesterday's date set at midnight

}

export {};