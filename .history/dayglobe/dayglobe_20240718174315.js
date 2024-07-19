class Sun {
    constructor(sunEl, windowEl, xChange, maxTime) {
        this.sunEl = sunEl;
        this.sunRadius = this.getSunRadius(sunEl);

        // values that require window width / height
        const windowDimensions = this.getWindowDimensions(windowEl);
        const windowWidth = windowDimensions[0];
        const windowHeight = windowDimensions[1];

        this.xChange = xChange;
        this.heightFunc = this.getHeightFunc(windowWidth, windowHeight);
        this.updateTime = this.getUpdateTime(windowWidth, xChange, maxTime);

        // time
        this.timeLapsed = 0;
        this.maxTime = maxTime;
    }

    getSunRadius(sunEl) {
        return sunEl.getBoundingClientRect().width/2;
    }

    getWindowDimensions(windowEl) {
        const positionInfo = windowEl.getBoundingClientRect();
        return [positionInfo.width, positionInfo.height];
    }

    getUpdateTime(windowWidth, xChange, maxTime) {
        return xChange * maxTime / windowWidth;
    }

    getHeightFunc(windowWidth, windowHeight) { // generate xy parabola in terms of max width and height https://www.desmos.com/calculator/pmkwrgbfkc
        const maxWidth = windowWidth;
        const maxHeight = windowHeight/2;

        const a = maxHeight/(maxWidth * maxWidth / 4);
        console.log(maxWidth, maxHeight, a);
        return (x) => a * x * (x - maxWidth) + windowHeight; // translate at y = 0 is at top of windowEl, inc y makes go down
    }

    cycle() {
        setInterval(this.moveSun(), this.updateTime);
    }

    moveSun(t) {
        if (this.timeLapsed > this.maxTime) {
            
        }

        let x = t * this.xChange;
        let y = this.heightFunc(x); // height function is in terms of x
        console.log(x, y);
        this.sunEl.style.transform = `translate(${x - this.sunRadius}px, ${y - this.sunRadius}px)`;

        this.timeLapsed += this.updateTime;
    }
}

/* dayglobe engine */

setupDayGlobe();

function setupDayGlobe() {
    const sunEl = document.getElementById('sun');
    const windowEl = document.getElementById('window-container');
    const maxTimeInMinutes = 2;
    const maxTime = maxTimeInMinutes * 6000; // time it takes from sun set to sun rise, in milliseconds
    const xChange = 1; // horizontal change per update, in px
    const sun = new Sun(sunEl, windowEl, xChange, maxTime);
    sun.cycle();

    /* move sun manually using key space
    let t = 0;

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            sun.moveSun(t++);
        } 
    })
    */
    
    /* center sun
    const windowEl = document.getElementById('window-container');
    let windowPositionInfo = windowEl.getBoundingClientRect();
    let windowHeight = windowPositionInfo.height;
    let windowWidth = windowPositionInfo.width;
    
    const sun = document.getElementById('sun');
    var sunPositionInfo = sun.getBoundingClientRect();
    let sunRadius = sunPositionInfo.width/2;
    
    var x = windowWidth/2 - sunRadius;
    var y = windowHeight/2 - sunRadius;
    sun.style.transform = `translate(${x}px, ${y}px)`;
    */
}