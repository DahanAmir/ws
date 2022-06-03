const express = require("express");
const subscription = require("./routers/subscriptionRouter");
const movieBL = require("./BL/movieBL");
const memberBL = require("./BL/memberBL");
const subscriptionBL = require("./BL/subscriptionBL");
const onloadBL = require("./BL/onload");

const memberRouter = require("./routers/memberRouter");

let app = express();

require("./configs/database");

app.use(express.json());

app.use("/api/subscription", subscription);

app.use("/api/member", memberRouter);

app.listen(8000);
const onload = async () => {
  await onloadBL.start();
};
onload();
