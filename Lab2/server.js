const http = require('http')
const fs = require('fs')
const {Transform} = require('stream')
let totallines=0;
let totalinfo=0;
let totalerror=0;
let totalwarn =0;

const readstream = fs.createReadStream('app.log')
const loganalyzer = new Transform({
    transform(chunk,encoding,cb){
        const line = chunk.toString().split('\n')
        line.forEach(line=>{
            if(line.trim()==='')return
            totallines++;
            if(line.includes('ERROR')) totalerror++
            else if(line.includes('WARN')) totalwarn++
            else if(line.includes('INFO')) totalinfo++
        })
        cb()
    }
})
readstream.on('end',()=>{
    console.log("LOG FILE SUMMARY REPORT")
    console.log("->")
    console.log(`total lines are:${totallines}`)
    console.log(`total warnning are:${totalwarn}`)
    console.log(`total info are:${totalinfo}`)
    console.log(`total error are:${totalerror}`)
})
readstream.pipe(loganalyzer)

