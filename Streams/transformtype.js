const fs = require("fs")
const {Transform} = require("stream")

const upper = new Transform({
    transform(chunk,encoding,cb){
        const modifiedData = chunk.toString().toUpperCase();
        cb(null,modifiedData)
    }
})

const readStream = fs.createReadStream('./info.txt')
const writeStream = fs.createWriteStream('./infooutput.txt')


// readStream.pipe(writeStream)//for copy text in another file

readStream.pipe(upper).pipe(writeStream)
// transform use between two string making connection 