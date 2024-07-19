moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    var positionInfo = windowEl.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    
    const sun = document.getElementById('sun');
    let x = height/2;
    let y = width/2;
    sun.style.transform = `translate(${x}px, ${y*-1}px)`;
}