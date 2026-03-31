import express from 'express'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'

const app = express();
app.use(cookieParser('my-super-secret-key'));

// phle set krna pdega then get
// app.get('/set-cookie',(req,res)=>{
//     res.cookie('name','rohan',{httpOnly:true});
//     res.send('Cookies has been send!')
// });

// simple authentication
const authMiddleware  = (req,res,next)=>{
    try {
        if(!req.cookies.token){
            return res.send("invalid user");
        }
        
        const token = req.cookies.token;   
        const decode = jwt.verify(token,"qwerty");   
        req.user = decode;
        next()
    } catch (err) {
        return res.send("invalid token");
    }

    // if(!req.cookies.name){
    //     res.send("invalid user");
    //     return;
    // }
    // next()
}

app.get("/dashboard",authMiddleware,(req,res)=>{
    const user = req.user
    console.log(user)
    res.send(`welcome to your dashboard , ${user.name}!`)
})

app.get('/get-cookie',authMiddleware,(req,res)=>{
    // agr cookies nai hae toh invalid user
    // if(!req.cookies.name){
    //     return res.send("invalid user");
    // }
    // const name = req.cookies.name;
    const user = req.user
    res.send(`cookie value : ${user.name}`);
})

app.get('/set-cookie',(req,res)=>{
    // agr cookies nai hae toh invalid user
    // if(!req.cookies.name){
    //     return res.send("invalid user");
    // }                       
    let user = {
        name:'rohan',
        email:'rohanb@gmail.com'
    }

    const token = jwt.sign(user,"qwerty",{expiresIn:"1h"});
    console.log(token)

    res.cookie("token",token,{httpOnly:true});
    res.send("Cookies has been settttttt!!!!!!!!!!!11")

    // const name = req.cookies.name;
    // res.send(`cookie value, ${name}`);
})

app.get('/profile',authMiddleware,(req,res)=>{
    // agr cookies nai hae toh invalid user
    // if(!req.cookies.name){
    //     return res.send("invalid user");
    // }

    // const token = req.cookies.token;   
    // const decode = jwt.verify(token,"qwerty");   

    console.log(req.cookies)   //  DEBUG (important)
    // learning

    const user = req.user;   //  middleware se data le rahe hain

    console.log(user)

    res.send(`Welcome to your profile, ${user.name}`);
})

app.get('/logout',authMiddleware,(req,res)=>{
    res.clearCookie("token")   
    res.send(`logout is successfull`)
})

app.listen(3000,()=>console.log("server is running on port 3000"))