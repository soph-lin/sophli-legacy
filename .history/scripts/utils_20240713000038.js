function updateSplash(text) {
    var splashMessageContainer = document.getElementById('splash-message-container');
    if (splashMessageContainer) {
        restartAnim(splashMessageContainer, 'typewriter');
        splashMessageContainer.innerHTML = text;
    }
    else console.error('welcomeMessageContainer not found');
}

function restartAnim(obj, anim) {
    if (obj) {
        obj.classList.remove(anim);
        void obj.offsetWidth; // triggers reflow, makes animation start at beginning
        obj.classList.add(anim);
    }
    else console.error('Object not found for restartAnim');
}