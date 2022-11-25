import Routes from "../src/routes";
import config from "./config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import favicon from "serve-favicon";
const app = express();
var path = require("path");

app.use(cors());

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, "../public/favicon.ico")));

app.use(Routes);

// mongoose connection
mongoose.connect("mongodb+srv://nhat:S1FjfeDE4zckzJiK@cluster0.otgjinv.mongodb.net", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
 })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database', error);
  });
app.get('/', (req,res) => {
  res.json({msg: 'OK'})
})
// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// Development error handler
// Will print stacktrace
if (app.get("env") === "development") {
  app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    res.send({
      message: error.message,
      error: error,
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function (error, req, res, next) {
  res.status(error.status || 500);
  res.send({
    message: error.message,
    error: error,
  });
});

app.listen(process.env.PORT || port, () =>
  console.log(`Server is running on  http://localhost:${port}`)
);

export default app;
