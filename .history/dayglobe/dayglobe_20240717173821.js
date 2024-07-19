moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    var positionInfo = windowEl.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    
    const sun = document.getElementById('sun');
    sun.style.top = 10;
    sun.style.left = 10;
}