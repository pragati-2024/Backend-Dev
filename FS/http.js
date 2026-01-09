// HTTP METHOD
// get -> read 
// post -> create
// put -> update 
// delete -> delete
// patch -> partial update


// API
// APPLICATION PROGRAMMING INTERFACE
// help to give communication between 2 server
// restAPI is a type of which use http for communication between frontend and backend

const http = require("http")
const server = http.createServer((req,res)=>{
    res.end("hello from http")
})

// port no and callback function
server.listen(3000,()=>{
    console.log("server is running")
})