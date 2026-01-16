const fs = require("fs");
const http = require("http");
// fs.readFile("./output.txt","utf-8",(err,data)=>{
//     console.log(data);
// })
// streams se data chunks mae aata hae jisse load na pde

// const readStream = fs.createReadStream("./output.txt",{
//     highWaterMark: 64*1024
//     // buffer ka size hota hae chumks mAE LETa hae phle 64 then 
// })
// readStream.on("data",(chunk)=>{
//     console.log(chunk.toString())
// })

const writeStream = fs.createWriteStream("./info.txt",{
    flags:"a" //for append->flag nai doge override krdega
})
writeStream.write("\n this is some text")
writeStream.write("\n this is some text")
writeStream.write("\n this is some text")
writeStream.write("\n this is some text")

writeStream.end()

writeStream.on("finish",()=>{
    console.log("writing finish")
})