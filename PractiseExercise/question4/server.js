import express from 'express'
const app = express()
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.get("/",(req,res)=>{
    res.send("this is a home page");
})
app.get("/contact",(req,res)=>{
    res.send("this is an contact page")
})
app.use((req,res)=>{
    res.status(404).render("error",{url : req.originalUrl})
})
app.listen(4000,()=>{
    console.log("server is running")
})