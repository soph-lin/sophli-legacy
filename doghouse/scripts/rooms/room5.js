(function() {
    let jimmy = instantiateEntity({
        anim: 'spinning',
        imgSrc: '/assets/characters/rottweiler.png'
    });

    jimmy.myFunction = function () {
        handleDialogue(dialogue);
    };

    const dialogue =
    {
        speaker: 'Jimmy',
        content:
        [
            [`* sniffs you  *#`],
            [`* licks you  *#`]
        ],
        randomizable: true
    };
})();