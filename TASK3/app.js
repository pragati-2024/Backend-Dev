const fs = require("fs");

function readFile() {
    fs.readFile('./log.txt', 'utf-8', (err, data) => {
        if (err) throw err;
        console.log("READ:", data);
    });
}

function writeFile() {
    fs.writeFile('./output.txt', 'this is new data', (err) => {
        if (err) throw err;
        console.log("WRITE success");
    });
}

function appendFile() {
    fs.appendFile('./output.txt', ' appended text', (err) => {
        if (err) throw err;
        console.log("APPEND success");
    });
}

function deleteFile() {
   fs.unlinkSync('./output.txt')
}

module.exports = {
    readFile,
    writeFile,
    appendFile,
    deleteFile
};
