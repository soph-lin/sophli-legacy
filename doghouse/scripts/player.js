var SPEED = 10;
const xInit = 40;
const yInit = 0;

var x = 40;
var y = 0;
position(x, y);

const keyHandlers = {
    ArrowUp: moveUp,
    ArrowDown: moveDown,
    ArrowLeft: moveLeft,
    ArrowRight: moveRight,
    w: moveUp,
    a: moveLeft,
    s: moveDown,
    d: moveRight,
    ' ': handlePlayerTrigger,
    x: testDis,
    y: displayRooms
};

window.onkeydown = function(event) {
  var keyPressed = event.key;
  if (keyHandlers.hasOwnProperty(keyPressed)) {
    event.preventDefault();
    keyHandlers[keyPressed]();
  }
};

function moveUp() { move(0, SPEED*-1) } /* Apparently for CSS translate, increasing y means moving downwards??? Weird, huh */
function moveLeft() { move(SPEED*-1, 0) }
function moveDown() { move(0, SPEED) }
function moveRight() { move(SPEED, 0) }

function position(x, y) {
    playerMove.style.transform = `translate(${x}px, ${y*-1}px)`;
}

function move(xDis, yDis) {
    flip(xDis);
    x += xDis;
    y += yDis;
    playerMove.style.transform = `translate(${x}px, ${y}px)`;

    const event = new Event('playerMoved');
    window.dispatchEvent(event);
}

function flip(xDis){
    if (xDis < 0) playerFlip.style.transform = `scaleX(-1)`;
    else if (xDis > 0) playerFlip.style.transform = `scaleX(1)`;
}

function handlePlayerTrigger(){
    if (currentObjTouched){
        const type = currentObjTouched.tagName;
        if (type === 'A') {
            const link = getLink(currentObjTouched);
            if (link) window.location.href = link; // Note that getLink() and currentLinkTouched are both in playerTriggerLink.
        }
        if (type === 'BUTTON'){
            currentObjTouched.myFunction();
        }
        if (currentObjTouched.classList && currentObjTouched.classList.contains('entity') && currentObjTouched.myFunction){
            currentObjTouched.myFunction();
        }
    }
}

// test funcs

function testDis() {
    dis = getTranslateDistances(playerMove, document.getElementById('logoContainer'));
    // move(dis[0],dis[1]*-1); // Multiply yDis by -1 since negative in HTML means moving up.
}