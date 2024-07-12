(async function() {
    var bean, gene, dean, green, sunscreen;

    await loadDoggos();

    instantiateCoffeeDog(800, -200, bean);
    instantiateCoffeeDog(500, -200, gene);
    instantiateCoffeeDog(400, -100, dean, 'right');
    instantiateCoffeeDog(100, -400, green, 'right', 'very-fast');
    instantiateCoffeeDog(700, -500, sunscreen);
    
    function instantiateCoffeeDog(x, y, dialogue, direction, animSpeed) {
        let dog = instantiateEntity({
            direction: 'left',
            x: x,
            y: y,
            width: 70,
            anim: 'jump',
            direction: (direction) ? direction : 'left',
            animSpeed: (animSpeed) ? animSpeed : null,
            imgSrc: '/assets/characters/beagle.png'
        });
    
        if (dialogue) dog.myFunction = function () {
            handleDialogue(dialogue);
        };
    }

    function loadDoggos() {
        return new Promise((resolve) => {
            bean =
            {
                speaker: 'Bean',
                content: [
                    [`there are so many beans in the world...#coffee beans... jelly beans... green beans... jumping beans...#what kind of bean am i?`],
                    [`i am dabeandabeandabean#`],
                    [`baddabean.#baddaboom#`],
                    [`you 'n i are meant to bean...#`],
                    [`beans, beans, the magical fruit...#the more you eat, the more you#...you know.`],
                    [`life is wonder#laughter#sadness#nostalgia#longing#and beans#`],
                    [`hmmhmmhmhmmhmmhmhmmhmhmmhmh hmmhmhmmhmhmmhmhm#what sound does a bean make#one of life's greatest mysteries#`],
                    [`to bean or not to beann... that is the question`]
                ],
                randomizable: true
            }

            gene =
            {
                speaker: 'Gene',
                content: [
                [`My name's ATGACTGTTCACTGCCCTCCGGCCCAGCACTGCTCTCCCTGAGGTTGGGGCTCAGGACTCTTCCAGTCACGCCAT#
                GGAGGAGCCGCAGTGGGGGCTGACTGTACCAGCTCCTACCTGGCCCCTCCAGCTCTCCCCATGGG#
                GAAGGGGAGGGGGGCTGGGGAGGCTGGGGAGCCGGAGAGGGCTGTTCTCCCTACCCTGAGCAGCAGCTGGAGACTGGCCCTGGACAAGCATGTTCTGTCCCCGGGAGGAACTCCCAGC#
                TCCCCAGCCCATGAGCGCTGAAGAGAACTCCAGGTCCCCGGGAGGTCCGGAGTGTCCCAGGCTCAGGGCTCCAGCTGCCCCATGGGAAGACTCCAGTGGTTGGAGGGAGCTCCCCGGGCAGTCCGG#
                GGTGCCTCAGGTGCTTCTGTCCCCGGGCCGGAGGAGGAGGAGGAGCCGGAGGAGGAGGGGCCGGAGCCGGGGACTGACATCCAGG#
                GCATCCCCCAACCTCCCCCAGGGGCTCTGCTCCTCTGGGGGACAGGGGGAAGAGCGGGGACAGGCGGGAG#
                CCCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCG#
                CGCGCGCG#
                CGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                *GASPPpppPPPPPpppPP*#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCG#
                CGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGC#
                GCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCGCG.#
                But people usually just call me Gene. I wonder why?#`],
                [`The genome is a wondrous thing... how did it come to be?#`],
                [`What??? Gene is a real name??? Aw, I thought it was original...`],
                [`Let's play...#Guess that gene!!!#Ok, FOXP2. Guess what it does#Ok, did you guess? Yup? Kk, let's see if you got it right....#
                FOXP2 is involved in the development of language and speech.#
                It is associated with a rare speech and language disorder known as developmental verbal dyspraxia.#`]
                ],
                randomizable: true
            }


            dean =
            {
                speaker: 'Dean',
                content: [
                [`
                I am Dean, head of these Een Family dogs.#
                Honestly, not sure why I'm head. They just chose me one day on a whim.#
                I'm not complaining though... I get cake every year on Dean Appreciation Day.#
                `],
                [`Taking care of these bouncing doggos sure is a handful...#`],
                [`Can I retire from being a dog?#The constant drooling, wagging, and chasing any moving object on impulse is getting a bit much...#`],
                [`Even though jumping around all the time is exhausting, I always get to skip leg day!#Well... I guess every day is leg day for me...#`],
                [`What're you lookin' at?#`],
                ],
                randomizable: true
            }


            green =
            {
                speaker: 'Green',
                content: [
                    [`I DRANK TOO MUCHHHHHH COFFEEEEEEEEEEE#I FEEL LIKE IM GONNA HURL#ITS A GREAT FEELING#`],
                    [`AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA#AAAAAAAAAAAAAAAAAAAAAAAAAAAAA#THIS IS A SCREAM OF JOY BTW#`],
                    [`THEY SAID DRINKING 1000 CUPS OF COFFEE ISNT GOOD FOR YOU BUT LOOK AT MMEMMEMMEMMMEEEEEEEEEE IM DOING GREAT`],
                    [`I AM PHASE SHIFTTTFTFTFTFTFTFTFTFTFTTFTFINGGGGGGGGG`],
                    [`Phew! I'm back to normal.#JUST KIDDINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG HAHHAHAHHAHHAH#`],
                    [`I CAN SEE EVERYTHING FROM HERE#THE PASTRY SHOP DOWN THE STREET#THE EIFFEL TOWER#THE SUN#THE UNIVERSE'S INCREDIBLE INDIFFERENCE#`]
                ],
                randomizable: true
            }

            sunscreen =
            {
                speaker: 'Sunscreen',
                content: [
                    [`sunshine and lollipops~#rainbows and gumdrops#`],
                    [`beautiful day outside, huh?#`],
                    [`this here is my lil spot o' sunshine#`],
                    [`going outside is good for your health...#
                    even the sunshine gives you vitamin d!#
                    now, what does vitamin d do? i have no clue...#`],
                    [`don't forget to put on sunscreen~#`],
                    [`beach day is best day#but staying inside is cool too#`],
                    [`i hope you're happy#but if you're sad, that's okay too#`],
                    [`feeling better yet?#`],
                    [`palindromes are fun#
                    never odd or even#
                    ¡allí!#
                    was it a car or a cat i saw?#
                    a toyota's a toyota#
                    #`]
                ],
                randomizable: true
            }
            resolve();
        });
    }
})(); 