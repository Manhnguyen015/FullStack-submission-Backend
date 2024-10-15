const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// const Blog = require("../models/node");
// const config = require("./utils/config"); //
// const logger = require("./utils/logger");
const blogsRouter = require("./controller/blogs");
const userRouter = require("./controller/users");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");
const loginRouter = require("./controller/login");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/blogs", blogsRouter);
app.use("/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandle);

module.exports = app;
