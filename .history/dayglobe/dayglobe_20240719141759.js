class Sun {
    constructor(sunEl, windowEl, xChange, cycleTime) {
        this.sunEl = sunEl;
        this.windowEl = windowEl;
        this.sunRadius = this.getSunRadius(sunEl);
        this.cycleTime = cycleTime;
        this.moving = false;

        // values that require window width / height
        const windowDimensions = this.getWindowDimensions(windowEl);
        const windowWidth = windowDimensions[0];
        const windowHeight = windowDimensions[1];

        this.xChange = xChange;
        this.heightFunc = this.getHeightFunc(windowWidth, windowHeight);
        this.updateTime = this.getUpdateTime(windowWidth, xChange, cycleTime);
    }

    getSunRadius(sunEl) {
        return sunEl.getBoundingClientRect().width/2;
    }

    getWindowDimensions(windowEl) {
        const positionInfo = windowEl.getBoundingClientRect();
        return [positionInfo.width, positionInfo.height];
    }

    getUpdateTime(windowWidth, xChange, cycleTime) {
        return xChange * cycleTime / windowWidth;
    }

    getHeightFunc(windowWidth, windowHeight) { // generate xy parabola in terms of max width and height https://www.desmos.com/calculator/pmkwrgbfkc
        const maxWidth = windowWidth;
        const maxHeight = windowHeight/2;

        const a = maxHeight/(maxWidth * maxWidth / 4);
        return (x) => a * x * (x - maxWidth) + windowHeight; // translate at y = 0 is at top of windowEl, inc y makes go down
    }

    cycle(startTime) {
        // prevent new cycle from starting if ongoing

        if (this.moving) {
            console.log(`cycle ongoing, can't start new cycle`);
            return;
        }

        // setup

        this.moving = true;
        this.sunEl.style.opacity = '1'; // the alternative, setting the display attribute, makes transform not work properly

        const animDelay = Math.min(startTime, this.cycleTime);

        this.sunEl.style.animation = `glow 4s ease-in-out infinite, phaseChange ${this.cycleTime}ms ease-in-out forwards`;
        this.sunEl.style.animationDelay = `-${animDelay}ms`;

        this.windowEl.style.animation = `skyChange ${this.cycleTime}ms ease-in-out forwards`;
        this.windowEl.style.animationDelay = `-${animDelay}ms`;

        // if cycle done, stop cycle

        this.move(timeLapsed += this.updateTime);
        
        if (timeLapsed > this.cycleTime) {
            console.log('cycle already done');
            return;
        }

        // if didn't reach end, start cycle

        let timeLapsed = startTime || 0;
        const self = this; // this in setTimeout is evaluated in different context, so need to pass self explicitly https://stackoverflow.com/questions/5911211/settimeout-inside-javascript-class-using-this
        console.log('cycle time: ' + this.cycleTime)
        console.log('update time: ' + this.updateTime);
        console.log('start time: ' + startTime);

        console.log('start cycle');

        const cycleID = setInterval(function () {
            if (timeLapsed > self.cycleTime) {
                clearInterval(cycleID);
                this.moving = false;
                console.log('cycle end');
            }
            self.move(timeLapsed);
            timeLapsed += self.updateTime;
        }, this.updateTime);

        return cycleID;
    }

    move(t) {
        let x = this.xChange * (t / this.updateTime);
        let y = this.heightFunc(x); // height function is in terms of x
        this.sunEl.style.transform = `translate(${x - this.sunRadius}px, ${y - this.sunRadius}px)`;

        this.timeLapsed += this.updateTime;
    }
}

// dayglobe engine

setupDayGlobe();

function setupDayGlobe() {
    const sunEl = document.getElementById('sun');
    const windowEl = document.getElementById('window');

    const sunriseHr = 6;
    const sunsetHr = 20;

    const testShortCycle = false;
    const cycleTimeInHrs = sunsetHr - sunriseHr;
    let cycleTime = cycleTimeInHrs * 3.6e+6; // time it takes from sun set to sun rise, in milliseconds
    let timeLapsed = timeSinceSunrise(sunriseHr);

    if (testShortCycle) {
        cycleTime = 0.5 * 60000;
        timeLapsed = 0;
    }

    const xChange = 1; // horizontal change per update, in px
    const sun = new Sun(sunEl, windowEl, xChange, cycleTime);

    if (isDaytime(sunriseHr, sunsetHr)) {
        let cycleID = sun.cycle(timeLapsed);
        let startTime = new Date();

        window.addEventListener('blur', () => { // stop cycle if leave tab
            console.log('blur');
            clearInterval(cycleID);
            sun.moving = false;

            window.addEventListener('focus', () => { // continue cycle
                console.log('focus');
                timeLapsed = timeSince(startTime);
                cycleID = sun.cycle(timeLapsed);
            }, {once: true})
        })
    }
}

function isDaytime(sunriseHr, sunsetHr) {
    const hours = new Date().getHours();
    return hours >= sunriseHr && hours <= sunsetHr;
}

function timeSince(time) { // in millisec
    const now = new Date();
    return now - time;
}

function timeSinceMidnight() {
    return timeSince(new Date().setHours(0,0,0,0));
}

function timeSinceSunrise(sunriseHr) {
    return timeSince(new Date().setHours(sunriseHr,0,0,0));
}