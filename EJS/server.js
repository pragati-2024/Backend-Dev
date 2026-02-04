import express from 'express';


const app = express();

//static server
//csr
//ssr
//template engine
//ejs,pug,hbs
//seo friendly
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/user",(req,res)=>{
    let userData={
        name:"vamika solanki",
        age:19
    }
    res.render("user",{userData});
})

app.get("/list",(req,res)=>{

    let arr=["apple","mango","orange"]
    res.render("list",{arr})
})

app.listen(3000,()=>{
    console.log("server is running")
})