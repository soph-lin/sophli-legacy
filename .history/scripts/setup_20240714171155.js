document.addEventListener('DOMContentLoaded', async function() {
    if (getPage().endsWith('ginkgo') || getPage().endsWith('ginkgo.php')) {
        addCSS('/css/ginkgo.css');
        addScript('/ginkgo/ginkgo-data.js');
        addScript('/ginkgo/multiselect-dropdown.js');
        addScript('/ginkgo/ginkgo.js', 'module');
    }
    else if ( (getPage().endsWith('spotistats') || getPage().endsWith('spotistats.php')) ) {
        addCSS('/css/spotistats.css');
        await addScript('/spotistats/spotistats-sample-data.js');
        await addScript('/spotistats/spotistats-icons.js');
        // await so data can load before analytics script (next script) does
        addScript('/spotistats/spotistats.js');
    }
    setupThemeEls(); // run in /scripts/theme.js
});