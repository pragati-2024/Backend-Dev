import express from 'express'
import cookieParser from 'cookie-parser'
const app = express();
app.use(cookieParser('my-super-secret-key'));
// phle set krna pdega then get
app.get('/set-cookie',(req,res)=>{
    res.cookie('name','rohan',{httpOnly:true});
    res.send('Cookies has been send!')
    
});
app.get('/get-cookie',(req,res)=>{
    // agr cookies nai hae toh invalid user
    if(!req.cookies.name){
        return res.send("invalid user");
    }
    const name = req.cookies.name;
    res.send(`cookie value : ${name}`);
})
app.get('/profile',(req,res)=>{
    // agr cookies nai hae toh invalid user
    if(!req.cookies.name){
        return res.send("invalid user");
    }
    const name = req.cookies.name;
    res.send(`Welcome to your profile, ${name}`);
})

app.listen(3000,()=>console.log("server is running on port 3000"))