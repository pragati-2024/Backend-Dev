const express = require('express')
const app=express()
const userData = require("./data")

// making object
let userInfo = {
    username:"pragati",
    password:"pass123"
}
// object destructuring->jb post  m bhejenge
// defininig variable->value set by position
const{ name, pass} = userInfo;

// for array
let arr = [1,2,3];
const [a,b,c] = arr;

// async programming
// eventloop
// streams
// server


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
// datatype of username->arrays.string
app.get("/userName",(req,res)=>{
    let userName = userData.map(user=>{
        if(user.gender === "female"){
            return "Ms "+user.name
        }
        else{
            return "Mr "+ user.name
        }
    })
    console.log(userName)
    res.json(userName)
    
})

// jo id url mae hogi uska data show hojayega website mae
app.get("/user/:id",(req,res)=>{
    const id = parseInt(req.params.id)//string mae ayegi interger m convert krne k lie parseint
    let user = userData.find((user)=>user.id === id)
    res.json(user);
})


