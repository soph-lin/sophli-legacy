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