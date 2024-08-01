function getTranslateDistances (el1, el2){
    const el1Rect = el1.getBoundingClientRect();
    const el2Rect = el2.getBoundingClientRect();

    const xDis = (el1Rect.x + el1Rect.width/2) - (el2Rect.x + el2Rect.width/2);
    const yDis = (el1Rect.y + el1Rect.height/2) - (el2Rect.y + el2Rect.height/2);

    /*
    console.log(xDis, yDis);
    console.log(el1Rect.x + el1Rect.width/2, el1Rect.y + el1Rect.height/2);
    console.log(el2Rect.x + el2Rect.width/2, el2Rect.y + el2Rect.height/2);
    */
    return [xDis, yDis];
}

function getRandFromArray(array){
    return array[Math.floor(Math.random()*array.length)];
}

function getRandFromDict(dict) {
    const keys = Object.keys(dict);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];
    return [randomKey, dict[randomKey]];
}

function displayRooms() {
    roomsMenu = document.getElementById('rooms-menu');

    if (roomsMenu) {
        roomsMenu.classList.add("boom");
        roomsMenu.style.display = "inline-block";
        const boomSound = new Audio('/assets/sounds/confirm-videogame.mp3');
        roomsMenu.addEventListener('animationend', function() {
            roomsMenu.classList.add('finished');
            boomSound.play();
            roomsMenu.classList.remove("boom");
        });
    }
}

function instantiateEntity(data) {
    // Variables for setup
    const animDurations = {
        'bounce': 2,
        'jump': 2,
        'jump-very-fast': 1
    };
    const animName = data.anim + + (data.animSpeed ? `-${data.animSpeed}` : '');
    const animDuration = animDurations[animName] ? animDurations[animName] : 2; // Get animDuration from library if exists, else default is 2.
    // Actual elements
    const move = document.createElement('div');
        move.classList.add('move-container');
        move.classList.add('entity');
        if (data.x && data.y)  move.style.transform = `translate(${data.x}px, ${data.y*-1}px)`;
        else if (data.x)  move.style.transform = `translate(${data.x}px, 0px)`;
        else if (data.y)  move.style.transform = `translate(0px, ${data.y*-1}px)`;
        else move.style.transform = `translate(500px, 0px)`;
    const flip = document.createElement('div');
        flip.classList.add('flip-container');
        if (data.direction === 'left') flip.style.transform = `scaleX(-1)`;
        else if (data.direction === 'right')  flip.style.transform = `scaleX(1)`;
        else flip.style.transform = `scaleX(-1)`;
    const anim = document.createElement('div');
        anim.classList.add('anim-container');
        anim.classList.add('animatable');
        if (data.anim) anim.classList.add(data.anim);
        if (data.animSpeed) {
            if (typeof data.animSpeed === 'string') anim.classList.add(data.animSpeed);
            else if (typeof data.animSpeed === 'number') {anim.style.animationDuration = `${data.animSpeed}s`;}
        }
        
        // // Default will randomize anim (between 0 and animDuration);
        if (data.animRandomStartTime !== false) anim.style.animationDelay = `-${Math.random() * animDuration}s`;

    const hitbox = document.createElement('div');
        hitbox.classList.add('hitbox');
    const img = document.createElement('img');
        if (data.imgSrc) img.src = data.imgSrc;

    if (data.width) {
        move.style.width = `${data.width}px`;
        img.style.width = `${data.width}px`; // Img size needs to be altered too for some reason, otherwise things get wonky.
    }
    if (data.height) {
        move.style.height = `${data.height}px`;
        hitbox.style.height = `${data.height}px`;
    }
    
    if (data.myFunction) move.myFunction = data.myFunction; // Currently unused, might scrap this feature later
    
    move.appendChild(flip);
    flip.appendChild(anim);
    anim.appendChild(hitbox);
    hitbox.appendChild(img);
    document.body.appendChild(move);
    return move;
}

function restartAnim(obj, anim) {
    if (obj) {
        obj.classList.remove(anim);
        void obj.offsetWidth; // Trigger a reflow. Ensures animation starts at beginning.
        obj.classList.add(anim);
    }
    else console.error('Object not found for restartAnim');
}

function updateWelcomeContainer(text) {
    var welcomeMessageContainer = document.getElementById("welcome-message-container");
    if (welcomeMessageContainer) {
        restartAnim(welcomeMessageContainer, 'typewriter');
        welcomeMessageContainer.innerHTML = text;
    }
    else console.error('welcomeMessageContainer not found');
}

function loadData(name) {
    return JSON.parse(localStorage.getItem(name));
}

function saveData(name, newData) {
    localStorage.setItem(name, JSON.stringify(newData));
}

function clearData() {
    localStorage.clear();
}

function removeElement(element) {
    removeAllEventListeners(element);
  
    while (element.firstChild) {
        removeElement(element.firstChild);
        if (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
  
    element.parentNode.removeChild(element);
  }

function removeAllChildElements(element) {
    while (element.firstChild) {
        removeElement(element.firstChild);
        if (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

function removeAllEventListeners(element) {
    const eventTypes = ['click', 'mouseover', 'mouseout', 'keydown', 'keyup', 'submit'];
    eventTypes.forEach(type => {
        element.removeEventListener(type, () => {});
    });
}