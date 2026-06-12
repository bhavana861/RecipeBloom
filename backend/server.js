const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDb = require("./config/connectionDb")
const cors=require("cors")

const PORT=process.env.PORT||3000
connectDb()

app.use(express.json())
app.use(cors())

app.use("/recipe",require("./routes/recipeRoute"))
app.use("/",require("./routes/userRoute"))
app.get("/",(req,res)=>{
    res.json({message:"Hello"})
})

app.listen(PORT,(err)=>{
    console.log(`App is running 0n PORT ${PORT}`);   
})