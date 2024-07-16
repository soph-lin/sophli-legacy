document.addEventListener('DOMContentLoaded', async function() {
    if (getPage().endsWith('ginkgo') || getPage().endsWith('ginkgo.php')) {
        addCSS('/css/ginkgo.css');
        addScript('/ginkgo/ginkgo-data.js');
        addScript('/ginkgo/multiselect-dropdown.js');
        addScript('/ginkgo/ginkgo.js', 'module');
    }
    else if ( (getPage().endsWith('spotistats') || getPage().endsWith('spotistats.php')) ) {
        addCSS('/css/spotistats.css');
        await addScript('/spotistats/spotistats-sample-data.js');
        await addScript('/spotistats/spotistats-icons.js');
        // await so data can load before analytics script (next script) does
        addScript('/spotistats/spotistats.js');
    }
    setupSplash();
    setupThemeEls(); // run in /scripts/theme.js
});

function setupSplash() {
    const splashMessageContainer = document.getElementById("splash-message-container");
    splashMessageContainer.textContent = splashMessages[randomMessageIndex];

    const msgs = [
        'pick a flower on earth and you move the farthest star',
        'and the rain lets up',
        'life cascades into oblivion',

    ];

    const specialMsgs = {
        '1-1': 'happy new year!',
        '2-14': `happy valentine's!`,
        '10-31': 'happy halloween!',
        '12-25': 'merry christmas!'
    };

    let today = getToday();
    if (today in specialMsgs) {
        splashMessageContainer.textContent = specialMsgs[today];
    }
    else {
        splashMessageContainer.textContent = random(msgs);
    }
}