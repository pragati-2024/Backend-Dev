// fs module
// importfs module
const fs = require("fs");
// callback function
// const read = (err,data)=>{
//     if(err) throw err
//     console.log(data);
// }
// fs.readFile('./log.txt','utf-8',read);

// // utf-8 bites mae convert krega


// readfile is asynchronous thats why the output of below code id first end this is log file
// console.log("first");

// fs.readFile('./log.txt','utf-8',(err,data)=>{
//     if(err) throw err
//     console.log(data);
// })
// console.log("end");



// console.log("first");
// const data = fs.readFileSync('./log.txt','utf-8');
// console.log(data);
// console.log("end");

// WRITE FILE->asynchronous
// console.log("first");
// const data = 'this is new data';
// fs.writeFile('./output.txt',data,(err)=>{
//     if(err) throw err
//     console.log("file write success")
// })
// console.log("end");


// append function-aynschronous
// console.log("first");
// fs.appendFile('./FS/output.txt',"this is new onw",(err)=>{
//     if(err) throw err
//     console.log("text add successfully")

// })

// delete function
fs.unlinkSync('./output.txt')

console.log("end");
 

