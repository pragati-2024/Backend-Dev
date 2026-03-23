import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    //schema structure bnata hae
    // model interact krega database se
    name:{
        type:'String',
        require:true,
        maxlength:[25,'Name must contain 25 character only']
    },
    email:{
        type:'String',
        require:true,
        unique:true,

    },
    password:{
        type:'String',
        require:true,
        minlength:[8,"password must contain 8 char only"]
    },
    role:{
        type:'String',
        enum:['user','admin'],
        default:'user'
    }
})
//now making model
const user = mongoose.model("user",userSchema)
export default user;