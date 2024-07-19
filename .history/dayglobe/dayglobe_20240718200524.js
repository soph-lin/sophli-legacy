class Sun {
    constructor(sunEl, windowEl, xChange, cycleTime) {
        this.sunEl = sunEl;
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
        console.log(maxWidth, maxHeight, a);
        return (x) => a * x * (x - maxWidth) + windowHeight; // translate at y = 0 is at top of windowEl, inc y makes go down
    }

    cycle() {
        if (this.moving) {
            return;
        }

        this.moving = true;
        let timeLapsed = 0;
        const self = this; // this in setTimeout is evaluated in different context, so need to pass self explicitly https://stackoverflow.com/questions/5911211/settimeout-inside-javascript-class-using-this
        console.log('cycle time: ' + this.cycleTime)
        console.log('update time: ' + this.updateTime);
        this.sunEl.style.animation = `glow 4s ease-in-out infinite, phaseChange ${this.cycleTime/1000}s ease-in-out `;
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
    const cycleTimeInMinutes = 0.5;
    const cycleTime = cycleTimeInMinutes * 60000; // time it takes from sun set to sun rise, in milliseconds
    const xChange = 1; // horizontal change per update, in px
    const sun = new Sun(sunEl, windowEl, xChange, cycleTime);

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            sun.cycle();
        } 
    })
}

function setTimeLapsed( ){
    
}