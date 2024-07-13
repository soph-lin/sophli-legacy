document.addEventListener('DOMContentLoaded', async function() {
    addScript('/scripts/utils.js');
    if (getPage().endsWith('ginkgo') || getPage().endsWith('ginkgo.php')) {
        addCSS('/css/ginkgo.css');
        addScript('/ginkgo/ginkgo-data.js');
        addScript('/ginkgo/multiselect-dropdown.js');
        addScript('/ginkgo/ginkgo.js', 'module');
    }
    else if ( (getPage().endsWith('spotistats') || getPage().endsWith('spotistats.php')) ) {
        addCSS('/css/spotistats.css');
        await addScript('/scripts/spotistats-sample-data.js');
        await addScript('/scripts/spotistats-icons.js');
        // await so data can load before analytics script (next script) does
        addScript('/scripts/spotistats.js');
    }
    setupThemeEls(); // run in /scripts/theme.js
});