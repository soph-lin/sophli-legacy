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

    posSun(t) {
        let x = t * this.xChange;
        let y = this.heightFunc(x); // height function is in terms of x
        console.log(x, y);
        this.sunEl.style.transform = `translate(${x - this.sunRadius}px, ${y - this.sunRadius}px)`;
    }
}

/* dayglobe engine */

setupDayGlobe();

function setupDayGlobe() {
    const sunEl = document.getElementById('sun');
    const windowEl = document.getElementById('window-container');
    const maxTime = 2; // time it takes from sun set to sun rise, in minutes
    const xChange = 1; // horizontal change per update, in px
    const sun = new Sun(sunEl, windowEl, xChange, maxTime);
    let t = 0;

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            sun.moveSun(t++);
        } 
    })
    
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