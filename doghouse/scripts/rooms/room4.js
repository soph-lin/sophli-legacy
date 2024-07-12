(function() {
    let watchdog = instantiateEntity({
        anim: 'bobbing',
        imgSrc: '/assets/characters/clock-dog.png'
    });

    watchdog.myFunction = function () {
        generateRandomDialogue();
    };

    const today = new Date();

    const days = {
        'halloween': new Date(today.getFullYear(), 9, 31),
        'christmas': new Date(today.getFullYear(), 11, 25)
    }

    function daysUntilRandom() {
        const [dayName, day] = getRandFromDict(days);
        if (today.getMonth() > day.getMonth() && today.getDate() > day.getDate()) {
            day.setFullYear(day.getFullYear() + 1);
        }   
        const diff = day.getTime() - today.getTime();
        const daysUntil = Math.floor(diff / (1000 * 60 * 60 * 24));
        return daysUntil + " days 'til " + dayName;
    
    }
    // I'll put other functions here too cus consistency
    function generateRandomDialogue() {   
        const dialogue =
        {
            speaker: 'Watchdog',
            content:
            [
                getRandFromArray(randomDialogueStarters),
                getRandFromArray(randomDialogueEvents)
            ]
        };
        handleDialogue(dialogue);
    }

    const randomDialogueStarters = [
        `tick tock tick tock`,
        `ticka-ticka-ticka-ticka`,
        `tock tick, tock tick`,
        `tock-tock-tock, tock-tock-tock`,
        `brrrrrrrinngggg~`
    ];
    
    const randomDialogueEvents = [
        [daysUntilRandom],
        `is time running out?#...#maybe it isn't#`,
        `don't forget to enjoy life to the fullest...#but don't worry, you got a lot of time#`,
        `time keeps on slippin', slippin', slippin' into the future`,
        `time is a valuable thing, watch it fly by as the pendulum swings`,
        `and nothing else compares~`,
        `hickory dickory dock.#
        the mouse went up the clock.#
        the clock struck one.
        the mouse went down.#
        hickory dickory dock.#
        tick tock, tick tock, tick tock, tick tock.#`,
        `and feel the breeze,#
        and drink the view,#
        and do not haste#
        to bid the golden hours adieu.#`,
        `time is too slow for those who wait,#
        too swift for those who fear,#
        too long for those who grieve,#
        too short for those who rejoice,#
        but for those who love, time is eternity.#`
    ];
})();