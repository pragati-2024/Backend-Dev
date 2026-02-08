import express from 'express'
import { userData } from '../data.js';
const router = express.Router()

// render user page
router.get("/user", (req, res) => {
  res.render("user", { userData });
});

// render index page
router.get("/",(req,res)=>{
  res.render("index")
})

// render edit page
router.get('/editpage/:id',(req,res)=>{
  const id = req.params.id;
  const user = userData.find((ele)=>ele.id == id)
  // console.log(id)

  res.render("edit",{userData:user})
})


export default router;