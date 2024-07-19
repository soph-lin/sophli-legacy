moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    var positionInfo = windowEl.getBoundingClientRect();
    var windowHeight = positionInfo.height;
    var windowWidth = positionInfo.width;
    
    const sun = document.getElementById('sun');
    let x = windowWidth/2;
    let y = windowHeight/2;
    sun.style.transform = `translate(${x}px, ${y}px)`;
}