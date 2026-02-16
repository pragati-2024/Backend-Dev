import express from 'express';
import userRoute from './router/userRoute.js';
import dotenv from 'dotenv';
dotenv.config();
let app=express();
app.use(express.json());//convert raw json string into js object
app.use("/api",userRoute);

app.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
});