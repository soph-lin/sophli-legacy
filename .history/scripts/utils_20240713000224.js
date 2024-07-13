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
    if (obj) {
        obj.classList.remove(anim);
        void obj.offsetWidth; // triggers reflow, makes animation start at beginning
        obj.classList.add(anim);
    }
    else 
}