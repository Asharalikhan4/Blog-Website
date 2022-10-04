const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database."))
.catch((err) => console.log(err));

app.use("/",(req,res)=>{
    res.send("Hello World!");
})

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is up and running on ${process.env.PORT}`);
})