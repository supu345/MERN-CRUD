const express = require("express");
const router = require("./src/route/api");
const app = new express();
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const mongoose = require("mongoose");

//Security
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }, { limit: "50mb" }));
app.use(bodyParser.json());

// Rate Limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300 });
app.use(limiter);

// Database Connection
let URL =
  "mongodb+srv://<username>:<password>@cluster0.fcgjuvw.mongodb.net/Mern-Crud";
let option = { user: "supu345", pass: "user123", autoIndex: true };
mongoose
  .connect(URL, option)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/v1", router);
app.use("*", (req, res) => {
  res.status(404).json({ status: "fail", data: "Not Found" });
});

app.use(express.static("client/dist"));

// Add React Front End Routing
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

module.exports = app;
