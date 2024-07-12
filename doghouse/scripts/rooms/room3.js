(function() {
    let kyle = instantiateEntity({
        anim: 'bobbing',
        imgSrc: '/assets/characters/terrier.png'
    });

    kyle.myFunction = function () {
        handleDialogue(dialogue);
    };

    const dialogue =
    {
        speaker: 'Kyle',
        content:
        [
            [`death#`],
            [`so real#`],
            [`...#`],
            [`black holes and supernovas#`],
            [`you suck#`],
            [`kyle is a terrible dog name#`],
            [`uuuuuuuu#`]
        ],
        randomizable: true
    };
})();