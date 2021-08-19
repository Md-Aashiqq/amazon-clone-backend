require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const UserRoute = require("./Routes/user");

const dbConnection = require("./util/dbConnection");

// default middleware
app.use(morgan("combined"));
app.use(cors({}));
app.enable("trust proxy");
app.use(express.json());

dbConnection();

const port = process.env.PORT || 3001;

//routes

app.use("/api/v1/user", UserRoute);

app.listen(port, () => {
  console.log(`APP Listeing on ${port}`);
});
