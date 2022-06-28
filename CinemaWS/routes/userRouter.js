const { response } = require("express");
var express = require("express");
var router = express.Router();
const userBL = require("../models/userBL");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret");
const mongoose = require("mongoose");

const RSA_PRIVATE_KEY = secret.secret();

router.get("/", async function (req, res, next) {
  token = req.query.token;
  let RSA_PRIVATE_KEY = secret.secret();
  var usersData = await userBL.getUsersJson();
  let users = usersData.users;

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  jwt.verify(token, RSA_PRIVATE_KEY, function (err, data) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    res.render("users", { users: users });
  });
});
router.get("/addnewmovie", async function (req, res, next) {
  token = req.query.token;
  let RSA_PRIVATE_KEY = secret.secret();
  res.render("createAccount", { token, token });
});

router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  let movieData = await userBL.getUserId(id);
  res.render("movie", { movie: movieData });
});
router.get("/edituser/:id", async function (req, res, next) {
  let id = req.params.id;
  let userData = await userBL.getUserId(id);
  res.render("editUser", { user: userData });
});
router.post("/savedata", async function (req, res, next) {
  token = req.query.token;
  let obj = req.body;
  updateUser={
    _id:obj._id,
    Fname:obj.Fname,
    username:obj.username,
    Lname:obj.Lname,
    CreateDate:obj.CreateDate,
    SessionTimeOut:obj.SessionTimeOut,
    Permissions:[obj["0"],obj["1"],obj["2"],obj["3"],obj["4"],obj["5"],obj["6"],obj["7"],]
    

  }
  console.log(obj);

  console.log(updateUser);


  
  //obj = {
 //   username: req.body.username,
 //   password: req.body.password,
 // };

  ///await userBL.postUsers(obj);
 // res.redirect("http://localhost:3000/users/?token=" + token);
});

module.exports = router;
