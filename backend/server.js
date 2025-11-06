const express=require("express")
const cors = require("cors");
const app=express()
const dotenv=require("dotenv").config()
const connectDb=require("./config/connectionDb")

const PORT=process.env.PORT || 3000
connectDb()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",require("./routes/user"))
app.use("/international",require("./routes/international"))


app.listen(PORT,(err)=>{
    console.log(`app is running on port ${PORT}`)
})