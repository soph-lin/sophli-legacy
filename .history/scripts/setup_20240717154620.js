document.addEventListener('DOMContentLoaded', async function() {
    let page = getPage();
    switch (page) {
        case 'ginkgo':
            addCSS('/css/ginkgo.css');
            addScript('/ginkgo/ginkgo-data.js');
            addScript('/ginkgo/multiselect-dropdown.js');
            addScript('/ginkgo/ginkgo.js', 'module');
            break;
        case 'spotistats':
            addCSS('/css/spotistats.css');
            await addScript('/spotistats/spotistats-sample-data.js');
            await addScript('/spotistats/spotistats-icons.js');
            // await so data can load before analytics script (next script) does
            addScript('/spotistats/spotistats.js');
        case 'dayglobe':
            addCSS('/dayglobe/dayglobe.css');
            addScript('/dayglobe/dayglobe.js');
        case 'lifeiszoo':
            addCSS('/writing/lifeiszoo/lifeiszoo.css');
    }
    setupSplash(page);
    setupThemeEls(); // run in /scripts/theme.js
    bindEvents();
});

function setupSplash(page) {
    const splashMessageContainer = document.getElementById('splash-message-container');

    if (!splashMessageContainer || splashMessageContainer.textContent) return; // don't set splash if none or already set

    const msgs = [
        'pick a flower on earth and you move the farthest star',
        'and the rain lets up',
        'life cascades into oblivion',
        'life is a beautiful, magnificent thing, even to a jellyfish'
    ];

    const specialMsgs = {
        '1-1': 'happy new year!',
        '2-14': `happy valentine's!`,
        '10-31': 'happy halloween!',
        '12-25': 'merry christmas!'
    };

    const pageMsgs = {
        'lifeiszoo': [
            'joy is discovery',
            'venture into the wilderness',
            'listen to the stillness... it is the world',
            'see the wonders, snatch it for yourself and keep it',
            'amidst the tsunamis and borealis',
            `it's a bright and sunshiney day, once again ~`,
            'nice weather for a picnic ~',
            'breathe in jungle safari'
        ]
    }

    let today = getToday();
    if (page in pageMsgs) { // page-specific message
        splashMessageContainer.textContent = random(pageMsgs[page]);
    }
    else if (today in specialMsgs) {
        splashMessageContainer.textContent = specialMsgs[today];
    }
    else {
        splashMessageContainer.textContent = random(msgs);
    }
}

function bindEvents() {
    // detect user interaction with dropdoww on .dropInfo
    const headers = document.querySelectorAll('.dropdown-header');
    const downCaret = "M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z";
    const upCaret = "m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z";
    if (headers) {
        headers.forEach(el => el.addEventListener('click', function() {
            svgEl = el.querySelector('svg');
            if (!svgEl) {
                console.error('.dropdown-header caret svg not found: ' + el);
            }

            // toggle open
            let open = el.open;
            if (open !== undefined) {
                open = !open;
                el.open = open;
            }
            else {
                open = true;
                el.open = true;
            }

            // update caret and display
            const info = el.nextElementSibling;
            if (open) {
                setSvgPath(svgEl, upCaret);
                info.style.display = 'block';
                new Audio('/sounds/open.wav').play();
            }
            else {
                setSvgPath(svgEl, downCaret);
                info.style.display = 'none';
                new Audio('/sounds/close.mp3').play();
            }
        }));
    } 
}