import user from "../model/UserSchema.js"
export const  getAllUsers = async(req,res) =>{
    try{
        const users = await user.find();
        //server se frontend mae bhejrhe ho response
        res.status(200).json({
            success:true,
            users
        })
        console.log(users)
    }
    catch(error){
        console.log("cant get user",error)
    }
}
// http://localhost:5000/api/user
// yeh run krna hae