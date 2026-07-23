import express from 'express'
import { userData } from '../data.js';
const router = express.Router();

router.get("/user", (req, res) => {
  res.render("user", { userData });
});

router.put("/api/user/:id",(req,res)=>{
  const{name,age}=req.body;
  const id = req.params.id;
  const index = userData.findIndex((ele)=>String(ele.id) === String(id))
  if(index == -1){
    return res.render("notfound")
  }
  userData[index]={id,name,age}
  // res.render("updating data",{username:index})
  res.redirect('/user');
})

router.post("/api/user", (req, res) => {
  const { name, age } = req.body;

  let newUserData = {
    id: userData.length + 1,
    name,
    age: Number(age),
  };

  userData.push(newUserData);

  res.redirect("/user");
});

router.delete("/api/user/:id",(req,res)=>{
    const userId = Number(req.params.id);
    const userindex = userData.findIndex((ele)=>ele.id === userId);
    if(userindex == -1){
        return res.send("user not found")
    }
    userData.splice(userindex,1);
    res.redirect("/user")
})
export default router;