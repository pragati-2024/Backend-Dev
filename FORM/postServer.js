const http = require("http");
const querystring = require("querystring");

const port = 3000;

const server = http.createServer((req, res) => {

    if (req.url === "/login" && req.method === "POST") {

        let data = "";

        req.on("data", (chunk) => {
            data += chunk.toString();
        });

        req.on("end", () => {
            console.log("raw data:", data);

            let parsedData = querystring.parse(data);
            console.log("parsed object:", parsedData);

            let jsonString = JSON.stringify(parsedData);
            let final = JSON.parse(jsonString);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({
                msg: "Data received",
                data: final
            }));
        });

    } else {
        res.end("server is running");
    }

});

server.listen(port, () => {
    console.log(`server is running on port ${port}`);
});