function updateSplash(text) {
    var splashMessageContainer = document.getElementById('splash-message-container');
    if (splashMessageContainer) {
        restartAnim(splashMessageContainer, 'typewriter');
        splashMessageContainer.textContent = text;
    }
    else console.error('splashMessageContainer not found');
}

function restartAnim(obj, anim) {
    if (!obj) {
        console.error('Object not found for restartAnim');
    }

    if (!obj.classList.contains(anim)) {
        console.error('Animation not found in\n' + obj);
    }

    obj.classList.remove(anim);
    void obj.offsetWidth; // triggers reflow, makes animation start at beginning
    obj.classList.add(anim);
}

function getToday() { // returns date mmdd (ex. 1-12)
    let today = new Date();
    return today.getMonth() + 1 + '-' + today.getDate();
}

/* randomizer functions */

function random(array) {
    if (array instanceof Array) {
        return array[(Math.floor(Math.random() * array.length))];
    }
    else {
        console.log('not an array silly billy');
        return null;
    }
}

function randomIndex(array) {
    if (array instanceof Array) {
        return Math.floor(Math.random() * array.length);
    }
    else {
        console.log('not an array silly billy');
        return null;
    }
}

function randomMultiple(array, n) {
    if (array instanceof Array) {
        const shuffled = array.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }
    else {
        console.log('not an array silly billy');
        return null;
    }
}

function chance(probability) {
    if (probability < 0 || probability > 1) {
        console.error('Please give a probability between 0 and 1, inclusive.');
    }
    return Math.random() < probability;
}

/* Script load functions */

function getPage() {
    let page = window.location.pathname.split("/").pop();
    if (page.endsWith('.php')) page = page.slice(0, -4); // slice .php from name
    console.log(page);
    return page;
}

function isPage(name) {
    let page = getPage();
    console.log(page);
    return page.endsWith(name) || page.endsWith(name + '.php');
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

/* Deprecated script load functions

function addScriptToHead(path, page) {
    if (isPageX(page)) addScript(path);
}

function addCSSToHead(path, page) {
    if (isPageX(page)) addCSS(path);
}

function isPageX(page) { // deprecated version of isPage
    var thisFileName = getPage();
    if (thisFileName === page) return true;
    else return false;
}

*/