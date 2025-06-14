require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

app.use("/", require("./src/routes/authRoutes"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SERVER RUNNING"));
