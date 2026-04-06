import User from "../model/UserSchema.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async(req,res)=>{
    try{
        const{name,email,password} = req.body
        const salt = await bcrypt.genSalt(10);
        const hashePassword = await bcrypt.hash(password,salt);

        const newUser = await User.create({
            name,email,password:hashePassword,
        });
        res.status(200).json({
            message:"user is created",
            newUser,
        })
    } 
    catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
        // console.log("cannot login")
    }
}
// signup page bnega isme
// email password  = 
// verify email in db
// check password using bycrypt.compare
// if password is corrct then ceate a token using jwt.sign
// send token in COOKIES to client

export const login=async(req,res)=>{
  try{
    const {email,password}=req.body;

    const user = await User.findOne({email}); 
    if(!user){
      return res.status(404).json({message:"user not found"});
    }

    const isMatched = await bcrypt.compare(password,user.password); 
    if(!isMatched){
      return res.status(401).json({message:"invalid credentials"});
    }

    const token = jwt.sign({id:user._id},"qweryuiop",{expiresIn:"1h"}); 

    res.status(200).json({message:"login successful",token});
  } catch (error) {
    res.status(500).json({
      message: "an error occurred",
      error: error.message
    });
  }
}