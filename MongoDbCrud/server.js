import connectDb from "./config/db.js"
import dotenv from "dotenv"
import express from 'express'
import userRoutes from "./routes/userRoutes.js";
const app = express()
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDb()
app.use(express.json())
app.use('/api',userRoutes)
app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})