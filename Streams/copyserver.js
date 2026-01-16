const fs = require("fs")
const readStream = fs.createReadStream("./output.txt")
const writeStream = fs.createWriteStream("./log.txt")
// eventlistner
// readStream.on("data",(chunk)=>{
//     let data = chunk.toString();
//     writeStream.write(data);
// })

// readStream.on("end",()=>{
//     writeStream.end();
// })

// for filr copy always use pipeline 
// readStream.pipe(writeStream)//copy a file

// for making text uppercase in output to log***************
readStream.on("data",(chunk)=>{
    let data = chunk.toString().toUpperCase();
    writeStream.write(data);
})
readStream.on("end",()=>{
    writeStream.end();
})


