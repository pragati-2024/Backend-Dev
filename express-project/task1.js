const express = require('express')
const app=express()
const userData = require('./data')
app.get("/",(req,res)=>{
    res.send("server is running")
})
app.get("/user/:id/:profile/:lang/:tab",(req,res)=>{
    // res.send("profile")
    const id = parseInt(req.params.id);
    let userid = userData.find((user)=>user.id === id);
    res.json(userid);
    const tab=req.query.tab
    const lang=req.query.lang
    if(tab == "info"){
        return res.send("info tab")
    }
    else if(tab == "post"){
        return res.send("post")
    }
    else if(tab=="settings"){
        return res.send("settings")
    }
    else if(lang == "english"){
        return res.send("english")
    }
    else if(lang == "hindi"){
        res.send("hindi")
    }
    else{
        res.send("nothing to write")
    }
    
    res.json({info,posts,settings,tab,lang})
})

app.listen(4000,()=>{
    console.log("server is runnning continue")
})