function updateWelcomeContainer(text) {
    var welcomeMessageContainer = document.getElementById("welcome-message-container");
    if (welcomeMessageContainer) {
        restartAnim(welcomeMessageContainer, 'typewriter');
        welcomeMessageContainer.innerHTML = text;
    }
    else console.error('welcomeMessageContainer not found');
}

function restartAnim(obj, anim) {
    if (obj) {
        obj.classList.remove(anim);
        void obj.offsetWidth;
        obj.classList.add(anim);
    }
    else console.error('Object not found for restartAnim');
}