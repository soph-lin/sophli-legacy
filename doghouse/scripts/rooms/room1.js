(function() {
    let gerald = instantiateEntity({
        anim: 'bobbing',
        imgSrc: '/assets/characters/french-bulldog.png'
    });

    gerald.myFunction = function () {
        handleDialogue(dialogue);
    };

    const dialogue =
    {
        speaker: 'Gerald',
        content:
        [
        `
        hi#
        i'm gerald!#
        but you prob already know dat :o#
        it says it in that neato box down there!#
        anyways...#
        you look new 'round here#
        are you from texas?#
        hmm?#
        why texas?#
        dunno, just seems like where people move would be from#
        you seem cool though#
        ...#
        oh#
        btw#
        i really like pickles#
        but i haven't been able to find any 'round here#
        :(#
        if you find any lmk#
        i will reward you#
        handsomely#
        `
        ]
    };
})();  