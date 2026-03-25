import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema({
    name:{
        type:'String',require:true,
        maxlength:[25,'Name must contain 25 character']
    },
    category:{
        type:'String', require:true
    },
    price:{
        type:'Number',require:true,min:[1,"Price must be greator than 1"]
    },
    stock:{
        type:Number,require:true
    },
    userid:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        require:true
    },
    specs: {
        type:Object
        
  },
    tags:[{
       type:String,require:true
    }]
})
const product = mongoose.model("products",ProductSchema)
export default product;
// relationship between productschema and userschema is   ONE USER TO MANY PRODUCT
// cap mae likhna hota hae code pr pr database mae small mae bnjaata hae with s/es

