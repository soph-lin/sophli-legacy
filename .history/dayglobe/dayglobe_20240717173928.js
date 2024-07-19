moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    var positionInfo = windowEl.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    
    const sun = document.getElementById('sun');
    sun.style.top = height/2 + 'px';
    sun.style.left = width/2 + 'px';
}