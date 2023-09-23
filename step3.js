const fs = require('fs');
const process = require('process');
const axios = require('axios');

// write file if out is given, else print

function handleOutput(text, out) {
    if(out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if(err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

// read file at path and print

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            console.log(data);
        }
    });
}

// read page at URL and print

async function webCat(url) {
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    }   catch {err} {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[4];
}

if (path.slice(0,4) === 'http') {
    webCat(path);
} else {
    cat(path, out);
}