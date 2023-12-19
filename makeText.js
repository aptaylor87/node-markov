/** Command-line tool to generate Markov text. */

const fs = require('fs');
const argv = process.argv;
const axios = require('axios');
const {MarkovMachine} = require('./markov')


function fromFile(path) {
    fs.readFile(path, 'utf-8', function( err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        else {
            let mm = new MarkovMachine(data)
            console.log(mm.makeText());
        }

        
    })
}

async function fromURL(url) {
    axios.get(url)
    .then(res => {
        let mm = new MarkovMachine(res.data)
            console.log(mm.makeText());})
    .catch( err => console.log(err))

}

const isValidUrl = urlString=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

if (argv[2] === "file") {
    fromFile(argv[3])
}
else if (argv[2] === "url") {
    if (isValidUrl(argv[3])) {
        fromURL(argv[3])
    }
    else {
        console.log("Invalid URL")
    }
}
else {
    console.log("Invalid command")
}