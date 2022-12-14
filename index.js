const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const app = express();
app.use(cors());

app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to database."))
.catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });
  
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/categories", categoryRoute);

  if(process.env.NODE_ENV=='production'){
    app.get('/',(req,res)=> {
      app.use(express.static(path.resolve(__dirname,'Frontend','build','index.html')));
      res.sendFile(path.resolve(__dirname,'Frontend','build','index.html'));
    })
  }

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is up and running on ${process.env.PORT}`);
})