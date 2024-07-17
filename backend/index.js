const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
const PORT = process.env.PORT || 8081;
const cors = require('cors')
const TaskRouter = require("./routes/TaskRouter");
const bodyParser = require("body-parser");

app.use(cors())
//for allowing to our server that we are sending JSON in body
app.use(bodyParser.json());

//Routes
app.use("/", TaskRouter);

app.listen(PORT, () => {
  console.log(`server started at port number ${PORT}`);
});
