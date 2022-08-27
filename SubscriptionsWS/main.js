const express = require("express");
////////////////////////////BL///////////////////////////////////////
const onloadBL = require("./BL/onload");
////////////////////////router/////////////////////////////////////
const subscriptionRouter = require("./routers/subscriptionRouter");
const memberRouter = require("./routers/memberRouter");
const movieRouter = require("./routers/movieRouter");
const authController = require("./routers/authController");

let app = express();
const cors = require('cors');


app.use(cors());
require("./configs/database");

app.use(express.json());
/////////////////////////////rout///////////////////////////////////
app.use("/api/subscription", subscriptionRouter);
app.use("/api/member", memberRouter);
app.use("/api/movie", movieRouter);
app.use("/api/auth", authController);

app.listen(8000);
const onload = async () => {
  await onloadBL.start();
};
//onload();
