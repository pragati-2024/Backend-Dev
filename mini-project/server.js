const http = require("http");
const fs = require("fs");
const { Transform } = require("stream");
const createWriteStream = fs.createWriteStream("access.log", { flags: "a" });
const user = [
  {
    name: "Pragati Bansal",
    age: 19,
    mail: "bpragati22@gmail.com",
  },
  {
    name: "Ashmita Agarwal",
    age: 20,
    mail: "ashmitaagarwl@gmail.com",
  },
  {
    name: "Suhani Sharma",
    age: 20,
    mail: "Suhanisharma22@gmail.com",
  },
];
const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const path = myURL.pathname;

  const log = `${req.method} ${path} ${new Date().toISOString()}\n`;
  createWriteStream.write(log);
  res.setHeader("Content-type", "text/html");
  // console.log(req.method);
  if (req.url === "/" && req.method === "GET") {
    res.write("Server is running");
  } else if (req.url === "/about" && req.method === "GET") {
    res.write("This is an about page");
  }
  // step2
  else if (req.url === "/user" && req.method === "GET") {
    res.writeHead(200, { "Content-type": "application/JSON" });
    res.write(JSON.stringify(user));
    res.end("server is running");
  } else if (req.url.startsWith("/uppercase") && req.method === "POST") {
    const upper = new Transform({
      transform(chunk, encoding, cb) {
        const modifiedData = chunk.toString().toUpperCase();
        cb(null, modifiedData);
      },
    });
    res.writeHead(200, { "content-type": "text/plain" });
    req.pipe(upper).pipe(res);
    return;
    // res.end("succesfully converted into upperCase");
  } else if (req.url.startsWith("/voweltransform") && req.method === "POST") {
    const createVowel = new Transform({
      transform(chunk, encoding, cb) {
        const mData = chunk.toString().replace(/[AEIOUaeiou]/g, "*");
        cb(null, mData);
      },
    });
    res.writeHead(200, { "content-type": "text/plain" });
    req.pipe(createVowel).pipe(res);
    return;
    // res.end("succesfully converted into vowels");
  } else {
    res.end("404 error");
  }
  res.end();
});
// const readStream = fs.createReadStream("../Streams/info.txt");
// const writeStream = fs.createWriteStream("../mini-project/newData.txt");
// readStream.pipe(createVowel).pipe(upper).pipe(writeStream);
server.listen(3000, () => {
  console.log("server is running");
});
// step 3

//step 4
// complete