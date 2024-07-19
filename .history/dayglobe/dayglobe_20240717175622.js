moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    let windowPositionInfo = windowEl.getBoundingClientRect();
    let windowHeight = windowPositionInfo.height;
    let windowWidth = windowPositionInfo.width;
    
    const sun = document.getElementById('sun');
    var sunPositionInfo = sun.getBoundingClientRect();
    let sunDiameter = sunPositionInfo.width;
    console.log(sunDiameter);

    let x = windowWidth/2;
    let y = windowHeight/2;
    sun.style.transform = `translate(${x}px, ${y}px)`;
}