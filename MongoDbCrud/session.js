import express from 'express'
import session from 'express-session'
const app  = express()
const PORT = process.env.PORT || 3000;
app.use(express.json())
// Enable session - >we are creating middleware
app.use(
    session({
        secret : "mysecretkey",
        resave:false,
        saveUninitialized:false,
        cookie:{
            maxAge: 1000 * 60 * 5 //5minutes
        },
    })
)
app.get("/login",(req,res)=>{
    let userInfo = {
        id:1,
        name : "Pragati bansal"
    }
//    req.session.user = {
//     id:1,
//     username : "Pragati Bansal",
//    }
    req.session.user = userInfo;
    res.send("User logged in");
})
// browser se aaraha hae req.session
app.get("/profile",(req,res)=>{
    if(req.session.user){
        res.send(`welcome, ${req.session.user.name}`);
    }
    else{
        res.status(401).send("Unauthorized")
    }
})
app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.status(500).send("could not log out")
        }
        res.send("User logged out")
    })
})
app.listen(PORT,()=>{
    console.log(`server is running on the port ${PORT}`)
})