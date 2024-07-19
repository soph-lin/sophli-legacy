function moveSun() {
    const windowEl = document.getElementById('window-container');
    const sun = document.getElementById('sun');
    
    // Get window container dimensions
    let windowPositionInfo = windowEl.getBoundingClientRect();
    let windowHeight = windowPositionInfo.height;
    let windowWidth = windowPositionInfo.width;
    
    // Get sun dimensions
    let sunPositionInfo = sun.getBoundingClientRect();
    let sunRadius = sunPositionInfo.width / 2;
    
    // Calculate center position
    let x = (windowWidth - sunPositionInfo.width) / 2;
    let y = (windowHeight - sunPositionInfo.height) / 2;
    
    // Apply translation
    sun.style.transform = `translate(${x}px, ${y}px)`;
}

// Call the function to move the sun
moveSun();
