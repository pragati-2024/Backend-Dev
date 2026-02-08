// import express from "express";
const express = require('express')
const app = express();
// middleware bnadia
app.use((req, res, next) => {
    // jaise abhi ka time store krliya
  const start = Date.now();
//   ab jaise hi response khtm hone ko hoga vaise hi hm end ka time store krke use minus krdene
  res.on("finish", () => {
    const end = Date.now(); 
    const time = end - start;
    console.log(`${req.method} ${req.url} took ${time} ms`);
  });

  next(); 
});
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/user", (req, res) => {
  res.send("User Page");
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
