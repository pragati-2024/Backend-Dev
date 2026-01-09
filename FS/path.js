// PATH MODULE****

const fs = require("fs")
const path = require("path");

// absolute path*
// const absolutePath = path.resolve("./log.txt")
// console.log(absolutePath);
// console.log(__dirname)
// console.log(path.basename('./notes/log.txt')) //filename-log
// console.log(path.extname('./notes/log.txt')) //filename-extention aaygea .txt
// console.log()

// const joinPath = path.join(__dirname,"notes","log.txt");
// console.log(joinPath);//join path

// const pathParse = path.parse(joinPath)
// console.log(pathParse)//gives root dir base ext and name

const filePath = path.join(__dirname,"log","log.txt")
const data = fs.readFileSync(filePath,'utf-8'); // with double inverted and without utf -8->output gives number but if wiht utf -8 it gives log ka text
console.log(data);


