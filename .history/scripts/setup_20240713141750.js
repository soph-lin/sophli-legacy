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
    let initialTheme = setupTheme();

    let lightbulb = document.getElementById('lightbulb');
    let pullCord = document.getElementById('pullCord');
    let lightOn = initialTheme === 'light';
    let onSound = new Audio('/sounds/lighton.wav');
    let offSound = new Audio('/sounds/lightoff.wav');
    let lightModeMessages = [
        'lights on!'
    ];
    let darkModeMessages = [
        'dark is the night.',
        'lights out!'
    ];

    // if dark mode, change lightbulb to dark (in page, originally set as light mode)
    lightbulb.

    // bind events

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
            
            document.documentElement.setAttribute('theme', 'light');
            localStorage.setItem('theme', 'light');
            updateSplash(random(lightModeMessages));
            onSound.play();
        }
        else {
            lightbulb.getElementsByTagName('path')[0].setAttribute('d', darkModeSvgPath);
            document.documentElement.setAttribute('theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateSplash(random(darkModeMessages));
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

function makeLightbulbOn(makeOn) {
    if (typeof makeOn != 'boolean') {
        console.error('Error: turnOnLight parameter needs to be boolean');
    }
    lightbulb.getElementsByTagName('path')[0].setAttribute('d', lightmodeSvgPath);
}

function setupTheme() {
    let theme = localStorage.getItem('theme');
    if (theme) {
        console.log(theme);
        document.documentElement.setAttribute('theme', theme);
        return theme;
    }
    else {
        document.documentElement.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
        return 'light';
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