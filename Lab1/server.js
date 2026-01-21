const http = require('http')
const fs = require('fs')

const arg = process.argv;
const port = arg[2] || 3000;

const server = http.createServer((req, res) => {

    if (req.url === '/writefunction' && req.method === "POST") {

        fs.writeFile('./data.txt',
            'MY name is pragati bansal',
            'utf-8',
            (err) => {

                if (err) {
                    res.writeHead(500, { "content-type": "text/plain" })
                    return res.end("error in this code")
                }

                res.writeHead(200, { "content-type": "text/plain" })
                res.end("file written successfully")
            }
        )

    } 
    else if(req.url == "/readfunction" && req.method === "POST"){
        fs.readFile("./data.txt","utf-8",(err,data)=>{
            if(err){
                res.writeHead(500,{"content-type":"text/plain"})
                res.write("Internal server error")
                res.end();
            }
            else{
                res.writeHead(200,{"content-type":"text/plain"})
                res.write(data);
                res.end("server can easily read the data")
            }
        })
    }
    
    else {
        res.writeHead(200, { "content-type": "text/plain" })
        res.end("server is running smoothly")
    }

})

server.listen(port, () => {
    console.log("server is running")
})
