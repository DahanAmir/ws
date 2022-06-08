const express = require("express");
////////////////////////////BL///////////////////////////////////////
const movieBL = require("./BL/movieBL");
const memberBL = require("./BL/memberBL");
const subscriptionBL = require("./BL/subscriptionBL");
const onloadBL = require("./BL/onload");
////////////////////////router/////////////////////////////////////
const subscriptionRouter = require("./routers/subscriptionRouter");
const memberRouter = require("./routers/memberRouter");
const movieRouter = require("./routers/movieRouter");

let app = express();

require("./configs/database");

app.use(express.json());
/////////////////////////////rout///////////////////////////////////
app.use("/api/subscription", subscriptionRouter);
app.use("/api/member", memberRouter);
app.use("/api/movie", movieRouter);

app.listen(8000);
const onload = async () => {
  await onloadBL.start();
};
//onload();
