import express from 'express'
const app= express();
let data =[{
    id:1,
    name:"ritika",
    rollno:4
},
{
    id:2,
    name:"reshu",
    rollno:5
}]
let mid1 = (req,res,next)=>{
    console.log("middleware 1")
    next()

}
let mid2 = (req,res,next)=>{
    console.log("middleware 2")
    next()
}

app.use(mid1)
app.use(mid2)


app.get("/",(req,res)=>{
    console.log(req.url)
    res.send("server is running")
})

// post route bnakr vaildation dalna hae
// app.post("/",(req,res)=>{

// })
// app.get("/",mid1,mid2,(req,res)=>{
//     console.log(req.url)
//     res.send("server is running")
// })
app.listen(3000,()=>{
    console.log("server")
})
