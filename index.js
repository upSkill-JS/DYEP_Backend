import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jobRoute from "./routes/job.js";
import userRoute from "./routes/user.js";
import morgan from "morgan";

const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json({ extended: true }));

// Setup Views
app.set("view engine", "ejs");

// Form Stuff
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware for static folder and morgan
app.use(express.static("public"));
app.use(morgan("dev"));

// Connecting to the database...
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  //mongoose.connect('mongodb://localhost:27017/empDB', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(
        `Success : Server running on port : http://localhost:${process.env.PORT}`
      )
    )
  )
  .catch((error) => console.log(`${error.message} did not connect`));

// Routes
app.get("/", (req, res) => {
  res.redirect("/job");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/register", (req, res) => {
  res.render("register");
})
app.get("/login", (req, res) => {
  res.render("login");
})

app.use("/job", jobRoute);
app.use("/user", userRoute);

app.get("*", (req, res) => {
  res.render("404");
});
