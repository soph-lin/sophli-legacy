(function() {
    let mickey = instantiateEntity({
        anim: 'bobbing',
        imgSrc: '/assets/characters/shih-tzu.png',
        width: 200
    });

    mickey.myFunction = function () {
        handleDialogue(dialogue);
    };

    const dialogue =
    {
        speaker: 'Mickey',
        content:
        [
            [`bark bark i am dog#`],
            [`ís it d/dx, dy/dx, or f'(x)??#
            i'm so confused :(( #`],
            [`i'm going to eat, i mean derive this bowl of dog food to nothing#`],
            [`a b c d e^x#
            ??#
            1 + x + x^2/2! + x^3/3! + x^4/4! + ...#
            hey, this isn't the alphabet!!#`],
            [`real question#
            is calculus a class on using calculators?#`]
        ],
        randomizable: true
    };
})();