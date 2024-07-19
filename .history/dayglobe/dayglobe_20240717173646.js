moveSun();

function moveSun() {
    const windowEl = document.getElementById('window-container');
    var positionInfo = windowEl.getBoundingClientRect();
    var height = positionInfo.height;
    var width = positionInfo.width;
    console.log(height, width);

    
}