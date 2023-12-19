const {MarkovMachine} = require('./markov')



describe("tests for Markov Machine", function() {
    let mm;
    let wordsArr;
    let chain;
    let output;

    beforeEach(function () {
        

        let testText = `Let’s have a little talk about tweetle beetles….

            What do you know about tweetle beetles? Well…

            When tweetle beetles fight,
            it’s called a tweetle beetle battle.

            And when they battle in a puddle,
            it’s a tweetle beetle puddle battle.

            AND when tweetle beetles battle with paddles in a puddle,
            they call it a tweetle beetle puddle paddle battle.

            AND…

            When beetles battle beetles in a puddle paddle battle
            and the beetle battle puddle is a puddle in a bottle…
            …they call this a tweetle beetle bottle puddle paddle battle muddle.

            AND…

            When beetles fight these battles in a bottle with their paddles
            and the bottle’s on a poodle and the poodle’s eating noodles…
            …they call this a muddle puddle tweetle poodle beetle noodle
            bottle paddle battle.`;
        
        mm = new MarkovMachine(testText);
        wordsArr = mm.words;
        chain = mm.makeChains();
        output = mm.makeText();
    });

    test("output is string", function () {
        expect(output).toEqual(expect.any(String))
    });

    test("is word from array in chain", function() {
        let idx = Math.floor(
            Math.random() * wordsArr.length
          )

          expect(Object.keys(chain)).toContain(wordsArr[idx])
    })

    test("Is next work matched in chain", function() {
        let idx = 1 + (Math.floor(
            Math.random() * wordsArr.length - 1
          ))
        
        let randomWord = wordsArr[idx]

        expect(chain[randomWord]).toContain(wordsArr[idx+1])
    })

});

