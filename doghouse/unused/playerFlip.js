/* These don't work since anim keeps changing scalex/y and thus overrides rule lmao */

function flip(xDis){
    const computedStyle = getComputedStyle(player);
    const currentTransform = computedStyle.getPropertyValue("transform");
    const matrixValues = currentTransform.match(/matrix\((.+)\)/)[1].split(",");
    const scaleXValue = parseFloat(matrixValues[0]) * -1;
    player.style.transform = `matrix(${scaleXValue},${matrixValues[1]},${matrixValues[2]},${matrixValues[3]},${matrixValues[4]},${matrixValues[5]})`;
}

function getStyleValue(rule) {
    const playerStyle = window.getComputedStyle(player);
    if (rule === 'scaleX'){
        const transformValue = playerStyle.getPropertyValue('transform');
        const scaleXValue = transformValue.match(/scaleX\(([^\)]+)\)/)[1];
        console.log(transformValue);
        console.log(scaleXValue);
        return scaleXValue;
    }
    else {
        console.error('Rule not set up in getStyleValue function.');
        return null;
    }
}