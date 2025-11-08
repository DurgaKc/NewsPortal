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

// Serve uploaded images
app.use(express.static("public"));
// app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use("/",require("./routes/user"))
app.use("/international",require("./routes/international"))
app.use("/politics",require("./routes/politics"))
app.use("/local", require("./routes/localgovernment"));
app.use("/sports", require("./routes/sports"));
app.use("/interview", require("./routes/interview"));
app.use("/entertainment", require("./routes/entertainment"));
app.use("/education", require("./routes/education"));
app.use("/health", require("./routes/health"));
app.use("/blog", require("./routes/blog"));
app.use("/lifestyle", require("./routes/lifestyle"));


app.listen(PORT,(err)=>{
    console.log(`app is running on port ${PORT}`)
})