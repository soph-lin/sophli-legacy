const settingsButton = document.getElementById('settings-button');
const settingsContainer = document.getElementById('settings-container');
const clearDataButton = document.getElementById('clear-data-button');

if (settingsButton && settingsContainer) {
    settingsContainer.style.display = 'none'; // Necessary since CSS style isn't recognized, only style made in JS

    settingsButton.addEventListener('click', toggleSettingsContainer);
    settingsContainer.addEventListener('click', function(event) {
        if (event.target === settingsContainer) {
            toggleSettingsContainer();
          }
    });

    if (clearDataButton) clearDataButton.addEventListener('click', handleClearData);
}
else console.error ('settingsButton and/or settingsContainer not found.');

function toggleSettingsContainer() {
    if (settingsContainer.style.display === 'none') settingsContainer.style.display = 'block';
    else settingsContainer.style.display = 'none';
}

function handleClearData() {
    modalData = {
        message: "are you sure you want to clear data? it can't be recovered again...",
        type: 'y/n',
        actionY: function () {
            clearData();
            window.location.href = '/';
        }
    };

    setupModalContainer(modalData);
}