import express from 'express';


const app = express();

//static server
//csr
//ssr
//template engine
//ejs,pug,hbs
//seo friendly
app.set("view engine","ejs")

// middleware mae url mae output aayega form m submit krne se toh use object m convert krega yeh
app.use(express.urlencoded({ extended: true }));

// npm install ejs

// DATA
let userData = [
  {
    id: 1,
    name: "Pragati Bansal",
    age: 19,
  },
  {
    id: 2,
    name: "vamika",
    age: 19,
  },
  {
    id: 3,
    name: "reshu",
    age: 20,
  },
];

// GET USER PAGE
app.get("/user", (req, res) => {
  res.render("user", { userData });
});

// ADD USER
app.post("/api/user", (req, res) => {
  const { name, age } = req.body;

  let newUserData = {
    id: userData.length + 1,
    name,
    age: Number(age),
  };

  userData.push(newUserData);

  res.redirect("/user");
});
// delete krhe hae isme
app.get("/api/user/:id",(req,res)=>{
    const userId = Number(req.params.id);
    const userindex = userData.findIndex((ele)=>ele.id === userId);
    if(userId == -1){
        return res.send("user not found")
    }
    userData.splice(userindex,1);
    res.redirect("/user")
})
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

app.listen(3000,()=>{
    console.log("server is running")
})