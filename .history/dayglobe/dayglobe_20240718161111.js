class Sun {
    constructor(sunEl, windowEl) {
        this.sunEl = sunEl;
        this.sunRadius = this.getSunRadius(sunEl);
        this.heightFunc = this.getHeightFunc(windowEl);

        console.log(this.heightFunc);
    }

    getSunRadius(sunEl) {
        return sunEl.getBoundingClientRect().width/2;
    }

    getHeightFunc(windowEl) { // generate xy parabola in terms of max width and height https://www.desmos.com/calculator/pmkwrgbfkc
        let windowPositionInfo = windowEl.getBoundingClientRect();
        let windowHeight = windowPositionInfo.height;
        let windowWidth = windowPositionInfo.width;

        const maxW = windowWidth;
        const maxH = windowHeight/2;

        const a = maxH/(maxW * maxW / 4);
        console.log(maxW, maxH, a);
        return (x) => a * x * (x - maxW) + windowHeight; // translate at y = 0 is at top of windowEl, inc y makes go down
    }

    moveSun(t) {
        let x = t*50;
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
    const maxTime = ; // in minutes
    const sun = new Sun(sunEl, windowEl);
    let t = 0;

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            sun.moveSun(t++);
        } 
    })
    
    /*
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