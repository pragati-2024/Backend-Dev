import express from 'express';
import methodOverride from "method-override"
import pageRoute from "./router/pageRoute.js"
import userRoute from "./router/userRoute.js"
import {userData} from "./data.js"

const app = express();
app.use(methodOverride('_method'))

//static server
//csr
//ssr
//template engine
//ejs,pug,hbs
//seo friendly
app.set("view engine","ejs")
// middleware mae url mae output aayega form m submit krne se toh use object m convert krega yeh
app.use(express.urlencoded({ extended: true }));
// page/ indexpage page / editpage page/
app.use(pageRoute)
app.use(userRoute)

// npm install ejs

// DATA
// let userData = [
//   {
//     id: 1,
//     name: "Pragati Bansal",
//     age: 19,
//   },
//   {
//     id: 2,
//     name: "vamika",
//     age: 19,
//   },
//   {
//     id: 3,
//     name: "reshu",
//     age: 20,
//   },
// ];

// GET USER PAGE
// app.get("/user", (req, res) => {
//   res.render("user", { userData });
// });

// ADD USER
// app.post("/api/user", (req, res) => {
//   const { name, age } = req.body;

//   let newUserData = {
//     id: userData.length + 1,
//     name,
//     age: Number(age),
//   };

//   userData.push(newUserData);

//   res.redirect("/user");
// });
// render index page
// app.get("/",(req,res)=>{
//   res.render("index")
// })
// delete krhe hae isme
// app.get("/api/user/:id",(req,res)=>{
//     const userId = Number(req.params.id);
//     const userindex = userData.findIndex((ele)=>ele.id === userId);
//     if(userId == -1){
//         return res.send("user not found")
//     }
//     userData.splice(userindex,1);
//     res.redirect("/user")
// })

// app.delete("/api/user/:id",(req,res)=>{
//     const userId = Number(req.params.id);
//     const userindex = userData.findIndex((ele)=>ele.id === userId);
//     if(userindex == -1){
//         return res.send("user not found")
//     }
//     userData.splice(userindex,1);
//     res.redirect("/user")
// })
// render edit page
// app.get('/editpage/:id',(req,res)=>{
//   const id = req.params.id;
//   const user = userData.find((ele)=>ele.id == id)
//   // console.log(id)

//   res.render("edit",{userData:user})
// })
// app.get("/",(req,res)=>{
//     res.render("index");
// })

// app.get("/user",(req,res)=>{
//     let userData={
//         name:"vamika solanki",
//         age:19
//     }
//     res.render("user",{userData});
// })

// app.get("/list",(req,res)=>{

//     let arr=["apple","mango","orange"]
//     res.render("list",{arr})
// })

// app.put("/api/user/:id",(req,res)=>{
//   const{name,age}=req.body;
//   const id = req.params.id;
//   const index = userData.findIndex((ele)=>String(ele.id) === String(id))
//   if(index == -1){
//     return res.render("notfound")
//   }
//   userData[index]={id,name,age}
//   // res.render("updating data",{username:index})
//   res.redirect('/user');
// })


app.listen(3000,()=>{
    console.log("server is running")
})