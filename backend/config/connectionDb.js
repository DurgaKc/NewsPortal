const mongoose=require("mongoose")
const connectDb=async()=>{
    await mongoose.connect(process.env.CONNECTING_STRING)
    .then(()=>console.log("connected..."))
    
}

module.exports=connectDb