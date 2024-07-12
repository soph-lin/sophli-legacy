const links = Array.from(document.querySelectorAll('a'));
const buttons = Array.from(document.querySelectorAll('button'));
var currentObjTouched = null;
var touchedAnything = false;
var playerTouchedLogo = false;
var playerRect = null;

// Add a scroll event listener to the window to detect changes in the player position
function handlePlayerMoved() {
  playerRect = playerHitbox.getBoundingClientRect();
  touchedAnything = false;
  checkLinkTrigger();
  checkButtonTrigger();
  checkGameEntities();
  if (!touchedAnything) currentObjTouched = null;
}

function checkOverlap(obj){
    const objRect = obj.getBoundingClientRect();
    const overlap = !(playerRect.right < objRect.left ||
                        playerRect.left > objRect.right ||
                        playerRect.bottom < objRect.top ||
                        playerRect.top > objRect.bottom);
    return overlap;
}

function checkLinkTrigger(){
    links.forEach(function(link) {
        const overlap = checkOverlap(link, playerRect);
        if (overlap) {
            link.classList.add('triggeredHover');
            currentObjTouched = link;
            if (getLink(currentObjTouched) === '/' && !playerTouchedLogo){
                const event = new Event('playerTouchedLogoTrigger');
                window.dispatchEvent(event);
                playerTouchedLogo = true;
            }
            touchedAnything = true;
        }
        else {
            link.classList.remove('triggeredHover');
            if (currentObjTouched && currentObjTouched.tagName === "A" && getLink(currentObjTouched) === '/'){
                playerTouchedLogo = false;
            }
        }
      });
}


function getLink(linkObject){
    if (linkObject.getAttribute('href')) return linkObject.getAttribute('href').toString();
    else return null;
}

function checkButtonTrigger(){
    buttons.forEach(function(button) {
        const overlap = checkOverlap(button, playerRect);
        if (overlap) {
            button.classList.add('triggeredHover');
            currentObjTouched = button;
            touchedAnything = true;
        }
        else {
            button.classList.remove('triggeredHover');
        }
      });
}

function checkGameEntities() { // Entities are instantiated in setupElements.js, since they are made after other scripts are added (including this one.)
    entities.forEach(function(entity) {
        const overlap = checkOverlap(entity, playerRect);
        if (overlap) {
            entity.classList.add('triggeredHover');
            currentObjTouched = entity;
            touchedAnything = true;
        }
        else {
            entity.classList.remove('triggeredHover');
        }
    });
}

window.addEventListener('playerMoved', handlePlayerMoved);