const express = require("express"); // import express
const app = express(); // create our app
const morgan = require("morgan");
const cors = require("cors");
const { NotFoundError } = require("./utils/errors");
const authRoutes = require("../lifetracker-api/routes/auth");
const security = require("../lifetracker-api/middleware/security");

// mount the middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
// * for every request, check if a token exists in the authorized header
// *  if it does, attach the decoded user to res.locals
app.use(security.extractUserFromJwt);

//routes
app.use("/auth", authRoutes);

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
