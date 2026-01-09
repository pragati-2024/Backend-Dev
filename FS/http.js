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
    console.log(req.url)
    console.log(req.method)

    res.writeHead(200,{"content-type": "text/html"})
    res.write("<h1> welcome </h1>")
    res.end()

    // console.log(req)
    // res.end("hello from http")
})

// port no and callback function
server.listen(3000,()=>{
    console.log("server is running")
})