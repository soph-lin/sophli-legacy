document.addEventListener('DOMContentLoaded', async function() {
    addScript('/scripts/utils.js');
    if (getPage().endsWith('scioly-search') || getPage().endsWith('scioly-search.php')) {
        addCSS('/css/scioly-search.css');
        addScript('/scripts/scioly-search-data.js');
        addScript('/scripts/multiselect-dropdown.js');
        addScript('/scripts/scioly-search.js', 'module');
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

function setupBaseEls() {
    document.querySelector('body').addEventListener('click', function (event) {
        if(event.target.tagName === 'A') { 
            new Audio('/sounds/click.wav');
        }
    });
}