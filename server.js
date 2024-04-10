const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./src/routes/v1");
const app = express();
const config = require('./src/config/env');
const CustomApiError = require('./src/utils/CustomApiError');
const httpStatus = require('http-status');
const http = require('http')

app.use(express.json());

// add security HTTP headers
app.use(helmet());

app.use(cors());
app.options("*", cors());

app.get("/", (req, res) => {
  res.send({
    message: "Hello Raluca",
  });
});

app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new CustomApiError(httpStatus.NOT_FOUND, http.STATUS_CODES[httpStatus.NOT_FOUND]));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong!' } = err;

  res.status(statusCode).send({
    error: message
  })
})

// app.use((req, res, next) => {

//   next(new CustomApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// // convert error to ApiError, if needed
// app.use(errorConverter);


//Connect to MongoDB
mongoose
  .connect(config.MONGODB_URL)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(config.PORT, () => console.log(`Server started on port ${config.PORT}`));

