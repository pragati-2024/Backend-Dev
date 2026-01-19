const express = require("express");
// const userData=require("./data")
// runtime define kraya h common js se isiliye require use kra
const app = express();
app.get("/", (req, res) => {
  res.send("HELLLO❤💘");
});
app.get("/user", (req, res) => {
  res.send("User Route💖");
});
app.get("/login", (req, res) => {
  res.send("Login Form💨");
});
app.get("/home", (req, res) => {
  res.send("Home Page💫");
});
app.get("/studentdata",(req,res)=>{
    res.send("Student data")
})
app.get("/deepaksir",(rq,res)=>{
    res.send("data of sir")
})
app.get("/ritika",(rq,res)=>{
    res.send("Pretty")
})
app.get("/reshu",(rq,res)=>{
    res.send("Cute")
})
app.get("/Pragati",(rq,res)=>{
    res.send("student")
})
app.get("/Vamika", (req, res) => {
  let user = [
    {
      name: "PRAGATI BANSAL",
      mail: "bpragati22@gmail.com",
      password: "123445556",
    },
  ];
  res.status(200).json(user)
  
  // res.json([{
  //     name:"PRAGATI BANSAL",
  //     mail:"bpragati22@gmail.com",
  //     password:"123445556"
  // }])
});
app.listen(3000, () => {
  console.log("server is running");
});
