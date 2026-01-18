const http = require('http')
const user=[
    {
        name :"Pragati Bansal",
        age:19,
        mail:"bpragati22@gmail.com"
    },
    {
        name :"Ashmita Agarwal",
        age:20,
        mail:"ashmitaagarwl@gmail.com"
    },
    {
        name :"Suhani Sharma",
        age:20,
        mail:"Suhanisharma22@gmail.com"
    }
]
const server = http.createServer((req,res)=>{
    
    res.setHeader("Content-type","text/html")
    // console.log(req.method);
    if(req.url === '/' && req.method==="GET"){
        res.write("Server is running")
    }
    else if(req.url === "/about" && req.method === "GET"){
        res.write("This is an about page")
    }
    // step2
    else if(req.url === "/user" && req.method === "GET"){
        res.writeHead(200,{"Content-type":"application/JSON"});
        res.write(JSON.stringify(user))
        res.end("server is running")
    }
    else{
        res.end("404 error")
    }
    res.end();
})
server.listen(3000,()=>{
    console.log("server is running")
})
// step 2
