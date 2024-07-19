function moveSun() {
    const windowEl = document.getElementById('window-container');
    const sun = document.getElementById('sun');

    // Get window container dimensions and position
    let windowPositionInfo = windowEl.getBoundingClientRect();
    let windowHeight = windowPositionInfo.height;
    let windowWidth = windowPositionInfo.width;
    
    // Get sun dimensions
    let sunPositionInfo = sun.getBoundingClientRect();
    let sunRadius = sunPositionInfo.width / 2;
    
    // Calculate center position relative to the window container
    let x = windowPositionInfo.left + (windowWidth / 2) - sunRadius;
    let y = windowPositionInfo.top + (windowHeight / 2) - sunRadius;
    
    // Set sun position
    sun.style.position = 'absolute';
    sun.style.left = `${x}px`;
    sun.style.top = `${y}px`;
}

// Call the function to move the sun
window.onload = moveSun;
