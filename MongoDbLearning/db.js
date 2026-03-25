import mongoose from 'mongoose'
const connectDb= async()=>{
    try{

        await mongoose.connect("mongodb://127.0.0.1:27017/BackendDb")
        //await lgate hae taaki next line phle execute n ho
        //sync await use ni kroge taki time delay n ho
        console.log("connection done")
    }
    catch(error){
        console.log("connection fail",error)
    }
}
export default connectDb;