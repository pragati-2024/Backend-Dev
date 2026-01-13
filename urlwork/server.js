const http = require("http");
const server = http.createServer((req,res)=>{
    const baseUrl = "http://localhost:3000"
    const parsedUrl = new URL(req.url,baseUrl);
    console.log(parsedUrl);
    res.end("server is running")
})
server.listen(3000,()=>{
    console.log("server is running")
})
let user2 = {
    name:"pragati",
    email:"bpragati21@gmail.com"
}

// destructuring
// let arr = ["apple","mango","aryan"]
// // const fruit = arr[0];
// // const fruit2 = arr[1];
// // const name = arr[2];

// // DESTRUCTURING
// const{fruit,fruit2,name} = arr;