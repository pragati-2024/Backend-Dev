import express from 'express'
const app = express()
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')
app.get('/contact',(req,res)=>{
    res.render('contact')
})
app.post('/contact',(req,res)=>{
    const{name,email,message}=req.body
    console.log("name",name)
    console.log("email",email)
    console.log("message",message)
    res.send("Form submitted successsfully")
})
app.listen(3000,()=>{
    console.log("server is running")
})