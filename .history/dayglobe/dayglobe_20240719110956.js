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
        if (this.moving) {
            return;
        }

        this.moving = true;
        this.sunEl.style.opacity = '1'; // the alternative, setting the display attribute, makes transform not work properly

        let timeLapsed = startTime || 0;
        const self = this; // this in setTimeout is evaluated in different context, so need to pass self explicitly https://stackoverflow.com/questions/5911211/settimeout-inside-javascript-class-using-this
        console.log('cycle time: ' + this.cycleTime)
        console.log('update time: ' + this.updateTime);

        this.sunEl.style.animation = `glow 4s ease-in-out infinite, phaseChange ${this.cycleTime}ms ease-in-out `;
        this.sunEl.style.animationDelay = `-${startTime}ms`;

        this.windowEl.style.animation = `skyChange ${this.cycleTime}ms ease-in-out `;
        this.windowEl.style.animationDelay = `-${startTime}ms`;

        this.move(timeLapsed += this.updateTime);
        const cycleIntervalID = setInterval(function () {
            if (timeLapsed > self.cycleTime) {
                clearInterval(cycleIntervalID);
                this.moving = false;
                console.log('cycle end');
            }
            self.move(timeLapsed);
            timeLapsed += self.updateTime;
        }, this.updateTime);
    }

    move(t) {
        let x = this.xChange * (t / this.updateTime);
        let y = this.heightFunc(x); // height function is in terms of x
        this.sunEl.style.transform = `translate(${x - this.sunRadius}px, ${y - this.sunRadius}px)`;

        this.timeLapsed += this.updateTime;
    }
}

/* dayglobe engine */

setupDayGlobe();

function setupDayGlobe() {
    const sunEl = document.getElementById('sun');
    const windowEl = document.getElementById('window-container');

    const sunriseHr = 6;
    const sunsetHr = 20;

    const cycleTimeInHrs = sunsetHr - sunriseHr;
    const cycleTime = cycleTimeInHrs * 3.6e+6; // time it takes from sun set to sun rise, in milliseconds
    const xChange = 1; // horizontal change per update, in px
    const sun = new Sun(sunEl, windowEl, xChange, cycleTime);

    if (isDaytime(sunriseHr, sunsetHr)) {
        sun.cycle(timeSinceSunrise(sunriseHr));
    }
}

function isDaytime(sunriseHr, sunsetHr) {
    const hours = new Date().getHours();
    return hours >= sunriseHr && hours <= sunsetHr;
}

function timeSinceMidnight() { // in millisec
    const today = new Date();
    const midnight = new Date().setHours(0,0,0,0);
    return today - midnight;
}

function timeSinceSunrise(sunriseHr) {
    const today = new Date();
    const sunrise = new Date().setHours(sunriseHr,0,0,0);
    return today - sunrise;
}