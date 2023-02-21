const express = require("express");
const getTopics = require("./controllers/controller");
const {
  serverError,
  notFoundError,
} = require("./error-handling-middleware/error-handling-middleware");

const app = express();

app.get("/api/topics", getTopics);

app.all("/*", notFoundError);
app.use(serverError);

module.exports = app;