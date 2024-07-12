let dialogueData = []; // Currently unused.
let isLocked = false;
let dialogueDelimiter = '#';
let dialogueTimeoutId = null;

const dialogueSpeaker = document.getElementById('dialogue-speaker');
const dialogueText = document.getElementById('dialogue-text');

// Functions with parameters get a bit weird from putting in myFunction, I'll fix it later maybe
async function handleDialogue(data) {
    const dialogueBox = document.getElementById('dialogue-container');
    if (dialogueBox) {
        dialogueBox.style.display = 'flex';

        var content;
        if (data.randomizable === true) content = getRandFromArray(data.content);
        else content = data.content;

        await dialogueLoop(content, data.speaker);
        await waitForKeypress('Enter');
        dialogueBox.style.display = 'none';
        unlockDialogue();
    }
}

async function dialogueLoop(content, speaker) {
    return new Promise(async (resolve) => {
        if (isLocked) { // Can't run multiple dialogues at once.
            resolve();
        }
        lockDialogue();
        
        if (speaker) dialogueSpeaker.innerHTML = speaker;
        else dialogueSpeaker.innerHTML = '';
        
        var currentItem = 0;
        for (let i = 0; i < content.length; i++){
            if (i > 0) await waitForKeypress('Enter');
            var item = content[currentItem];
            // console.log(item);
            if (typeof item === 'string' && item.includes(dialogueDelimiter)) item = parseDialogueLines(item);
            await displayDialogueItem(item);
            currentItem++;
        }
        resolve();
    });
}

function lockDialogue() {
    isLocked = true;
}
  
function unlockDialogue() {
    isLocked = false;
}

function displayParsedLines(lines) {
    return new Promise(async (resolve) => {
        for (let i = 0; i < lines.length; i++){
            if (i > 0) await waitForKeypress('Enter');
            displayDialogueItem(lines[i]);
        }
        resolve();
    });
}

async function displayDialogueItem(item) {
    return new Promise(async (resolve) => {
        stopType();
        if (Array.isArray(item)) await displayParsedLines(item);
        if (typeof item === 'string') displayDialogueText(item);
        if (typeof item === 'function'){
            const res = item();
            if (typeof res === 'string') {
                displayDialogueText(res);
            }
        }
        resolve();
    });
     // document.getElementById('choices-list').innerHTML = '';
}

function displayDialogueText(text) {
    // const dialogueText = document.getElementById('dialogue-text');
    if (dialogueText) {
        dialogueText.innerHTML = '';
        type(text, 50);
        /*
        restartAnim(dialogueText, 'dialogue-typewriter');
        dialogueText.textContent = text;
        */
    }
    else console.error('dialogueText not found');
}

function type(messageToShow, timeBetween, currentPos = 0) {
    if (currentPos < messageToShow.length) {
        dialogueText.innerHTML += messageToShow.charAt(currentPos);
        currentPos++;
        dialogueTimeoutId = setTimeout(function() { type(messageToShow, timeBetween, currentPos); }, timeBetween);
    }
}

function stopType() {
    clearTimeout(dialogueTimeoutId);
}

function parseDialogueLines(line) {
    if (typeof line === 'string'){
        var parsedLines = line.split('\n')
            .map(str => str.trim())
            .flatMap(str => str.split('#').filter(Boolean));
        return parsedLines;
    }
}

function handleChoiceClick(event) {
  var choiceIndex = Array.from(event.target.parentNode.parentNode.children).indexOf(event.target.parentNode); // Get index of clicked choice
  var line = dialogueData[currentLine]; // Get current dialogue line
  // Handle events/variables associated with current line and clicked choice
  // Update currentLine variable to move to the next line
  // Call displayDialogue() to update UI with next line
}

function displayDialogueChoices(){
    // Loop through choices and create list items
  for (let i = 0; i < line.choices.length; i++) {
    var choice = line.choices[i];
    var listItem = document.createElement('li');
    var button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', handleChoiceClick); // Add event listener for button click
    listItem.appendChild(button);
    document.getElementById('choices-list').appendChild(listItem);
  }
}

function waitForKeypress(desiredKey) {
    return new Promise(resolve => {
        document.addEventListener('keydown', function listener(event) {
            if (event.key === desiredKey) {
                document.removeEventListener('keydown', listener);
                resolve();
            }
        });
    });
}