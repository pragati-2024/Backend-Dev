    const express = require('express')
    const app=express()

    const userData=[{
        name:"PragatiBansal",
        age:19,
        gender:"female"
    },
    {
        name:"ashmitagarwal",
        age:20,
        gender:"female"
    },
    {
        name:"SuhaniSharma",
        age:20,
        gender:"female"
    }
    ];
    app.get('/user',(req,res)=>{
        const name=req.query.name
        const namewise= userData.filter((ele)=>ele.name.toLowerCase()==name.toLowerCase())
        res.json(namewise)
    })
    app.listen(3000,()=>{
        console.log("server is running")
    })