const fs = require('fs')
fs.readFile('log.txt','utf-8',(err,data)=>{
    if(err){
        console.log("error");
        return;
    }
    const words = data.split(" ");
    const count = words.length;
    fs.writeFile('output.txt',String(count),(err)=>{
        if(err){
            console.log("file write error");
        }
        else{
            console.log("count done successfully");
        }
    });
    
});