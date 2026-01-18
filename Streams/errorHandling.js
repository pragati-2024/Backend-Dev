// error handling ->js always handle error
// console.log("first")
// const a = 10;
// console.log(a/0);
const {error} = require("console")
try{
    throw new error("there is something wrong")
}
catch(error){
    console.log(error.message)
}


// console.log("end")

const http = require("http")
const server = http.createServer((req,res)=>{
    throw new Error("there is something wrong")
    res.end("server is running")
})

server.listen(3000,()=>{
    console.log("server is running")
})