const express = require('express')
const app=express()
const userData = require("./data")
app.get("/",(req,res)=>{
    res.send("server is running")
})
app.get("/userDetail",(req,res)=>{
    res.json(userData)
})
app.listen(3000,()=>{
    console.log("server is running")
})
// create a route which display a user
// age>25
// let a = [1,2,3,4,5,6]
// let evennum = a.filter((x)=>x%2==0);
app.get("/userAge",(req,res)=>{
    let userAge = userData.filter(user=>user.age>25);
    res.json(userAge)
})
app.get("/userName",(req,res)=>{
    let userName = userData.map(user=>{
        if(user.gender == "female"){
            return "Ms "+user.name
        }
        else{
            return "Mr "+ user.name
        }
    })
    res.json(userName)
    
})