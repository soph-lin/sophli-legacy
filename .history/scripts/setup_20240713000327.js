document.addEventListener('DOMContentLoaded', async function() {
    addScript('/scripts/utils.js');
    if (getPage().endsWith('scioly-search') || getPage().endsWith('scioly-search.php')) {
        addCSS('/css/scioly-search.css');
        addScript('/scripts/scioly-search-data.js');
        addScript('/scripts/multiselect-dropdown.js');
        addScript('/scripts/scioly-search.js', 'module');
    }
    else if ( (getPage().endsWith('spotistats') || getPage().endsWith('spotistats.php')) ) {
        addCSS('/css/spotistats.css');
        await addScript('/scripts/spotistats-sample-data.js');
        await addScript('/scripts/spotistats-icons.js');
        // await so data can load before analytics script (next script) does
        addScript('/scripts/spotistats.js');
    }

    setupBaseEls();
});

function setupBaseEls() {
    setupTheme();

    let lightbulb = document.getElementById('lightbulb');
    let pullCord = document.getElementById('pullCord');
    let lightOn = true;
    // from https://icons.getbootstrap.com/icons/lightbulb/
    let lightmodeSvgPath = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1";
    // from https://icons.getbootstrap.com/icons/lightbulb-fill/
    let darkModeSvgPath = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5";
    let onSound = new Audio('/sounds/lighton.wav');
    let offSound = new Audio('/sounds/lightoff.wav');

    lightbulb.addEventListener('mouseover', function() {
        console.log('hovering');
        console.log('animating');
        pullCord.classList.add("dropAnim");
    }, { once: true });

    pullCord.addEventListener('click', function() {
        console.log('pull');
        pullCord.classList.add('pullAnim');
        lightOn = !lightOn;
        if (lightOn) {
            lightbulb.getElementsByTagName('path')[0].setAttribute('d', lightmodeSvgPath);
            document.documentElement.setAttribute('theme', 'light');
            localStorage.setItem('theme', 'light');
            onSound.play();
        }
        else {
            lightbulb.getElementsByTagName('path')[0].setAttribute('d', darkModeSvgPath);
            document.documentElement.setAttribute('theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateSplash('dark is the night.');
            splashMessageContainer.textContent = 'dark is the night.';
            offSound.play();
        }
    });

    pullCord.addEventListener('animationend', function() {
        if (pullCord.classList.contains('dropAnim')) {
            pullCord.classList.add('dropped');
            pullCord.classList.remove('dropAnim');
        }
        if (pullCord.classList.contains('pullAnim')) {
            pullCord.classList.remove('pullAnim');
        }
    });
}

function setupTheme() {
    let theme = localStorage.getItem('theme');
    if (theme) {
        console.log(theme);
        document.documentElement.setAttribute('theme', theme);
    }
    else {
        document.documentElement.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

function addScriptToHead(path, page) {
    if (isPage(page)) addScript(path);
}

function addCSSToHead(path, page) {
    if (isPage(page)) addCSS(path);
}

function getPage() {
    return window.location.pathname.split("/").pop();
}

function isPage(page) {
    var thisFileName = getPage();
    if (thisFileName === page) return true;
    else return false;
}

function addScript(path, type, makeDefer) {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.src = path;

        if (type) script.type = type;
        if (makeDefer) script.defer = true;
        script.addEventListener('load', () => {
            resolve();
        });
        script.addEventListener('error', () => {
            reject(`Failed to load script: ${path}`);
        });
        document.head.appendChild(script);
    });
}

function addCSS(path) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = path;
    document.head.appendChild(link);
}