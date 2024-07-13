document.addEventListener('DOMContentLoaded', async function() {
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

function setupBaseEls() {
    let lightbulb = document.getElementById("lightbulb");
    let pullCord = document.getElementById("pullCord");
    let pullCordAnimating = false;
    let lightmodeSvgPath = "";
    let darkModeSvgPath = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5";

    lightbulb.addEventListener("mouseover", function() {
        console.log('hovering');
        console.log('animating');
        pullCordAnimating = true;
        pullCord.classList.add("dropAnim");
    }, { once: true });

    pullCord.addEventListener("click", function() {
        console.log('pull');
        pullCord.classList.add("pullAnim");
    });

    pullCord.addEventListener("animationend", function() {
        console.log('anim end');
        if (pullCord.classList.contains("dropAnim")) {
            pullCord.classList.remove("dropAnim");
        }
        else if (pullCord.classList.contains("pullAnim")) {
            pullCord.classList.remove("pullAnim");
        }
    });
}