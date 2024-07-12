var playerMove = null;
var playerFlip = null;
var playerHitbox = null;

var entities = null; // Could be located in playerTrigger.js, but I'll keep it here for now


document.addEventListener('DOMContentLoaded', async function() {
    await setUpScripts();
    setUpElements();
});

async function setUpScripts() {
    const scriptsToLoad = [
      '/scripts/utils.js',
      '/scripts/modal.js',
      '/scripts/settings.js',
      '/scripts/dialogue.js',
      '/scripts/dialogueData.js',
      '/scripts/welcomeMessage.js'
    ];
  
    const playerScriptsToLoad = [
      '/scripts/playerTrigger.js',
      '/scripts/player.js'
    ];

    playerMove = document.getElementById('player');
    if (playerMove) {
        playerFlip = playerMove.getElementsByClassName('flip-container')[0];
        playerHitbox = playerMove.getElementsByClassName('hitbox')[0];
    }
  
    const scriptPromises = [
        ...scriptsToLoad.map(script => addScript(script)),
        ...(playerMove && playerFlip ? playerScriptsToLoad.map(script => addScript(script)) : [])
    ];
    await Promise.all(scriptPromises); 
}

function addScript(path, makeDefer) {
    return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.src = path;
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

function addScriptToHead(path, page) { // Currently unused.
    if (isPage(page)) addScript(path);
}

function getPage() {
    return window.location.pathname.split("/").pop();
}

function isPage(page) {
    var thisFileName = getPage();
    if (thisFileName === page) return true;
    else return false;
}

async function setUpElements(){
    setupRoomsMenu();
    await setupRoomLogic();
    entities = Array.from(document.getElementsByClassName('entity'));
}

async function setupRoomsMenu() {
    const roomsMenuList = document.getElementById('rooms-menu-list');
    const numRooms = 6;

    for (let i = 0; i < numRooms; i++) {
        let roomItem = document.createElement('li');
        roomItem.innerText = i + 1;
        roomItem.addEventListener('click', function () {
            saveData('currentRoom', roomItem.innerText);
            window.location.href = '/rooms.php';
        });
        roomsMenuList.appendChild(roomItem);
    }
}

async function setupRoomLogic() {
    return new Promise(async (resolve) => {
        const roomsMenu = document.getElementById('rooms-menu');
        const startButton = document.getElementById('start-button');
    
        if (loadData('startedGame')) {
            // Show room link on navbar
            if (roomsMenu) roomsMenu.style.display = 'inline-block';
            if (startButton) startButton.style.display = 'none';
            // Load room
            if (loadData('currentRoom')) {
                try {
                    await addScript(`/scripts/rooms/room${loadData('currentRoom')}.js`);
                }
                catch (error) {
                    handleDialogue({content: ['Nothing here so far... Wonder what will arrive?']});
                }
                saveData('currentRoom', null);
            }
        }
        else if (getPage() !== '' && getPage() !== '/about') { // If haven't started game, can't access pages other than home and about page.
            handleDialogue({content: ['Uh oh, doesn\'t look like anything\'s here. Maybe you should head back to the homepage.']});
        }
        resolve();
    });
}

    /* Deprecated loadRoom.
    if (loadData('startedGame')) {
        // Show room link on navbar
        if (roomsMenu) roomsMenu.style.display = 'inline-block';
        if (startButton) startButton.style.display = 'none';

        // Add room scripts (+ generate room objects)
        const isRoomRegex1 = /^room(\d+)$/; // Regex yay! Format: room#
        const isRoomRegex2 = /^room(\d+)\.php$/; // Regex yay! Format: room#.php. Won't be used for live website, just for when testing (since hiding php in url not available in VS Code)
        var isRoomMatch = getPage().match(isRoomRegex1); // Result is ['room#.php', '#']
        if (!isRoomMatch) isRoomMatch = getPage().match(isRoomRegex2);
        if (isRoomMatch) await addScript(`/scripts/rooms/room${isRoomMatch[1]}.js`);
    }
    else if (getPage() !== '' && getPage() !== '/about') { // If haven't started game, can't access pages other than home and about page.
        handleDialogue({content: ['Uh oh, doesn\'t look like anything\'s here. Maybe you should head back to the homepage.']});
    }
    */    