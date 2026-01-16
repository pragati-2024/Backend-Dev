const fs = require("fs");
const { Transform } = require("stream");

const upper = new Transform({
    transform(chunk, encoding, cb) {
        const modifiedData = chunk.toString().toUpperCase();
        cb(null, modifiedData);
    }
});

const createvowel = new Transform({
    transform(chunk, encoding, cb) {
        const modifiedData = chunk
            .toString()
            .replace(/[AEIOUaeiou]/g, "*"); //regex
        cb(null, modifiedData);
    }
});

const readStream = fs.createReadStream("./info.txt");
const writeStream = fs.createWriteStream("./infooutput.txt");

readStream
    .pipe(createvowel)
    .pipe(upper)
    .pipe(writeStream);
