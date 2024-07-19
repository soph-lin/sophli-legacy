setupDayGlobe();

class Sun {
    constructor(sunEl, windowEl) {

    }

    getHeightFunc(sun, windowEl) { // generate parabola in terms of max width and height https://www.desmos.com/calculator/pmkwrgbfkc
        let windowPositionInfo = windowEl.getBoundingClientRect();
        let windowHeight = windowPositionInfo.height;
        let windowWidth = windowPositionInfo.width;


        var sunPositionInfo = sunEl.getBoundingClientRect();
        let sunRadius = sunPositionInfo.width/2;

        const maxW = windowWidth/2;
        const maxH = windowHeight/2;
        const a = - 1 * maxH/(maxW^2 / 4);
        return (x) => a * x * (x - w);
    }

    moveSun() {

    }
}

function setupDayGlobe() {
    const sunEl = document.getElementById('sun');
    const windowEl = document.getElementById('window-container');
    const sun = new Sun(sunEl, windowEl);
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