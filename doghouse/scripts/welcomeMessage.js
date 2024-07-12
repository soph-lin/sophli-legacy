(function() {
    var beginningMessage = [
        'wonder what that start button does...',
        'what\'s that in the center...? start?'
    ];
    
    var welcomeMessage = [
        'welcome back, missed ya bud',
        'let\'s go!! adventure awaits...',
        'you can go or you can stay~ whatever makes you happy~',
        'lalalala everything is new and wonderful'
    ]

    const welcomeMessageContainer = document.getElementById('welcome-message-container');
    
    if (welcomeMessageContainer && (isPage('') || isPage('index.php') || isPage('index'))) {
        if (!loadData('startedGame')) start();
        else updateWelcomeContainer(getRandFromArray(welcomeMessage));
    }
    
    function start() {
        const startButton = document.getElementById('start-button');
        
        if (!startButton || !welcomeMessageContainer) console.error('Start button and/or welcomeMessageContainer not found.');
        else {
            if (welcomeMessageContainer) welcomeMessageContainer.innerHTML = getRandFromArray(beginningMessage);
            startButton.addEventListener('click', function(){
                updateWelcomeContainer('uh oh... looks like the cursor doesn\'t work.. maybe try using your paws instead??');
            });
            startButton.myFunction = function () {
                displayRooms();
                updateWelcomeContainer('woah... new places!! adventure awaits...');
                saveData('startedGame', true)
                this.remove();
            }
        }
    }
})();