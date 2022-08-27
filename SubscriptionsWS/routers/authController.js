const express = require("express");
const userBL = require("../BL/userBL");
var router = express.Router();
const jwt =require("jsonwebtoken")

router.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.sendStatus(401);
  } else {
   var user = await userBL.login(username,password);

    if (user) {
      //  const userId = findUserIdForUserName(username);
      const userId = "someuserid";

      //Get the real secret key from db or envinroment variable..
      const RSA_PRIVATE_KEY = "somekey";

      var tokenData = jwt.sign(
        { id: user.username },
        RSA_PRIVATE_KEY,
        { expiresIn: 7200 } // expires in 2 hours
      );
      res.status(200).send({ token: tokenData });
    } else {
      res.sendStatus(401);
    }
  }
});

module.exports = router;
