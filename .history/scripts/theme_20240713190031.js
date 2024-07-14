function setupThemeEls() {
    const initialTheme = setupTheme();

    const lightbulb = document.getElementById('lightbulb');
    const pullCord = document.getElementById('pullCord');
    let lightOn = initialTheme === 'light';

    // setup pull cord handle, 1 in 100 chance to get easter egg handle
    const customPullCordHandle = setupPullCordHandle();

    // if dark mode, change lightbulb to dark (in page, originally set as light mode)
    turnOnLightAppearance(lightOn);

    // bind events
    lightbulb.addEventListener('mouseover', function() {
        pullCord.classList.add("dropAnim");
    }, { once: true });

    pullCord.addEventListener('click', function() {
        pullCord.classList.add('pullAnim');
        lightOn = !lightOn;
        turnOnLight(lightOn, customPullCordHandle);
    });

    pullCord.addEventListener('animationend', function() {
        if (pullCord.classList.contains('dropAnim')) {
            pullCord.classList.add('dropped');
            pullCord.classList.remove('dropAnim');
        }
        if (pullCord.classList.contains('pullAnim')) {
            pullCord.classList.remove('pullAnim');
        }
    });
}

function turnOnLight(on, customPullCordHandle) { // change appearance of lightbulb icon
    if (typeof on != 'boolean') {
        console.error('Error: turnOnLight parameter needs to be boolean');
    }

    const onSound = new Audio('/sounds/lighton.wav');
    const offSound = new Audio('/sounds/lightoff.wav');

    let customSplashMsg = null;
    let customSound = null;
    if (customPullCordHandle) {
        customSplashMsg = customPullCordHandle.randMsg();
        customSound = customPullCordHandle.sound || null;
    }

    const lightModeMessages = [
        'lights on!'
    ];
    const darkModeMessages = [
        'dark is the night.',
        'lights out!'
    ];

    const splashContainerExists = document.getElementById('splash-message-container') !== null;

    if (on) {
        document.documentElement.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
        turnOnLightAppearance(on);
        if (splashContainerExists) updateSplash(customSplashMsg || random(lightModeMessages));
        new Audio(customSound || '/sounds/lighton.wav').play();
    }
    else {
        document.documentElement.setAttribute('theme', 'dark');
        localStorage.setItem('theme', 'dark');
        turnOnLightAppearance(on);
        if (splashContainerExists) updateSplash(customSplashMsg || random(darkModeMessages));
        new Audio(customSound || '/sounds/lightoff.wav').play();
    }
}

function turnOnLightAppearance(on) {
    if (typeof on != 'boolean') {
        console.error('Error: turnOnLightAppearance parameter needs to be boolean');
    }
    
    // from https://icons.getbootstrap.com/icons/lightbulb/
    let lightmodeSvgPath = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1";
    // from https://icons.getbootstrap.com/icons/lightbulb-fill/
    let darkModeSvgPath = "M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5";

    if (on) {
        lightbulb.getElementsByTagName('path')[0].setAttribute('d', lightmodeSvgPath);
    }
    else {
        lightbulb.getElementsByTagName('path')[0].setAttribute('d', darkModeSvgPath);
    }
}

function setupTheme() {
    let theme = localStorage.getItem('theme');
    if (theme) {
        document.documentElement.setAttribute('theme', theme);
        return theme;
    }
    else {
        document.documentElement.setAttribute('theme', 'light');
        localStorage.setItem('theme', 'light');
        return 'light';
    }
}

class PullCordHandle {
    constructor(icon, msgs, params) {
        this.icon = icon;
        this.msgs = msgs;
        if (params) {
            this.sound = params.sound || null;
            this.coords = params.coords || null;
        }
    }

    randMsg() {
        if (typeof this.msgs == 'string') {
            return this.msgs;
        }
        else if (this.msgs.isArray()) {
            return random(this.msgs);
        }
        else {
            console.error('Error: no message set in custom pull cord handle: ' + this);
        }
    }
}

function setupPullCordHandle() {
    const specialHandles = {
        '2-14': new PullCordHandle('🌹', 'a rose for thee', {coords: {x: -7}}),
        '12-25': new PullCordHandle('🎁', 'a gift for you on a special day 🎄')
    };
    const miscHandles = [
        new PullCordHandle('🕷️', 'aaah! spider'),
        new PullCordHandle('⚓', 'ahoy matey!', {coords: {x: -11}}),
        new PullCordHandle('🔔', 'ring ring', {sound: '/sounds/bell.mp3'})
    ];
    const customPullCordHandleEl = document.getElementById('customPullCordHandle');
    let customPullCordHandle = null;

    let today = new Date();
    let todayParsed = today.getMonth() + 1 + '-' + today.getDate();
    if (todayParsed in specialHandles) { // set up special handle if matches date
        customPullCordHandle = specialHandles[todayParsed];
    }
    else if (chance(0.01)) { // otherwise chance for misc handle (1 in 100)
        customPullCordHandle = miscHandles[1];
    }

    if (customPullCordHandle) {
        // set icon
        customPullCordHandleEl.textContent = customPullCordHandle.icon;
        // adjust coords if custom
        const coords = customPullCordHandle.coords;
        if (coords) {
            if (coords.x) customPullCordHandleEl.setAttribute('x', coords.x);
            if (coords.y) customPullCordHandleEl.setAttribute('y', coords.y);
        }
    }

    return customPullCordHandle;
}