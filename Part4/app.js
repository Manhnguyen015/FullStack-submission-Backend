const express = require("express");
const app = express();
const cors = require("cors");
const Blog = require("./models/node");
const config = require("./utils/config"); //
const logger = require("./utils/logger");
const blogsRouter = require("./controller/blogs");
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

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

app.use("/api/notes", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandle);

module.exports = app;
