moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    let windowPositionInfo = windowEl.getBoundingClientRect();
    let windowHeight = windowPositionInfo.height;
    let windowWidth = windowPositionInfo.width;
    
    const sun = document.getElementById('sun');
    var sunPositionInfo = sun.getBoundingClientRect();
    let sunRadius = sunPositionInfo.width/2;
    /*
    let x = windowWidth/2 - sunRadius;
    let y = windowHeight/2 - sunRadius;
    */
    let x = windowEl.offsetWidth/2 - sun.offsetWidth/2;
    let y = windowEl.offsetHeight/2 - sun.offsetWidth/2;
    sun.style.transform = `translate(${x}px, ${y}px)`;
}