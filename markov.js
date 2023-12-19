
/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chain = {}
    for (let i = 0; i < this.words.length; i++) {
      chain[this.words[i]] = []
    }
    for (let i = 0; i < this.words.length; i++) {
      if (this.words[i+1] === undefined) {
        chain[this.words[i]].push(null)
      } else{
        chain[this.words[i]].push(this.words[i+1])
      }
      
    }
    
    // console.log(chain)
    return chain
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let chain = this.makeChains()
    let lastWord = null;
    let textResponse = "";
    for (let i = 0; i < numWords;) {
      // Checks to see if the last word is null. If it is then it randomly selects a new word.
      if (lastWord === null) {
        let idx = Math.floor(
          Math.random() * this.words.length
        );
        let newWord = this.words[idx];
        // this checks to make sure the new word that was selected isn't null, if it is, it starts over, if it isn't it adds that word to the string with a space after it. 
        if (newWord === null) {
          continue;
        } else {
          textResponse += `${newWord} `;
          lastWord = newWord;
          i++; 
        }    
      } 
      // If that last word was not null, then we check the chain to come up with a random next word.
       else {
        let options = chain[lastWord];
        let idx = Math.floor(
          Math.random() * options.length
        )
        let newWord = options[idx]
        if (newWord === null) {
          textResponse += "\n";
          lastWord = newWord;
          i++;
        } else {
          textResponse += `${newWord} `;
          lastWord = newWord;
          i++; 
        }   
      }
    }
    
    return textResponse
  }
}
// let testText = "the cat in the hat"
// let mm = new MarkovMachine(testText);
// let chain = mm.makeChains();
// let output = mm.makeText();
// console.log(typeof(output))
// let mm = new MarkovMachine("the cat in the hat");
// mm.makeText()

module.exports = {
  MarkovMachine: MarkovMachine
}