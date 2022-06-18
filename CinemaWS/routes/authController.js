const express = require("express");
const jwt = require("jsonwebtoken");
const userBL = require("../models/userBL");
var router = express.Router();
router.post("/login", async function (req, res) {
  obj = {
    username: req.body.username,
    password: req.body.password,
  };

  let user = await userBL.getUsers();

  //if (validateUsernameAndPassword()) {
  if (user) {
    //  const userId = findUserIdForUserName(username);
    const userId = user.id;

    //Get the real secret key from db or envinroment variable..
    const RSA_PRIVATE_KEY = "somekey";

    var tokenData = jwt.sign(
      { id: userId },
      RSA_PRIVATE_KEY,
      { expiresIn: 2500 } // expires in 2 hours
    );
    Data = { token: tokenData, id: user.id };

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
