moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    var positionInfo = windowEl.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    
    const sun = document.getElementById('sun');
    let x = 0;
    let y = 0;
    sun.style.transform = `translate(${x}px, ${y}px)`;
}