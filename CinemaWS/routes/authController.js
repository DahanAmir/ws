const express = require("express");
const jwt = require("jsonwebtoken");
const userBL = require("../models/userBL");
var router = express.Router();
const secret = require("../configs/secret");
const RSA_PRIVATE_KEY = secret.secret();
router.post("/login", async function (req, res) {
  console.log(RSA_PRIVATE_KEY);
  obj = {
    username: req.body.username,
    password: req.body.password,
  };

  let user = await userBL.login(obj);
  if (user) {
    //Get the real secret key from db or envinroment variable..

    var tokenData = jwt.sign(
      { id: user._id },
      RSA_PRIVATE_KEY,
      { expiresIn: user.SessionTimeOut } // expires in 2 hours
    );
    Data = { token: tokenData, _id: user._id };

    // res.JSON('token', JSON.stringify( tokenData )); //use encrypted token
    res.render("main", { Data: Data });
    ///res.status(200).send({  token: tokenData });

    ///res.status(200).send({ token: tokenData });
  } else {
    res.sendStatus(401);
  }
});

router.get("/", function (req, res, next) {
  res.render("login", {});
});

module.exports = router;
