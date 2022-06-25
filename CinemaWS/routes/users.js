const { response } = require("express");
var express = require("express");
var router = express.Router();
const userBL = require("../models/userBL");
const jwt = require('jsonwebtoken');
const secret = require("../configs/secret")
const RSA_PRIVATE_KEY=secret.secret()


router.get("/", async function (req, res, next) {
  token =  req.query.token 
  let RSA_PRIVATE_KEY=secret.secret()
  var usersData = await userBL.getUsersJson();
  let users=usersData.users


  if (!token)
  {return res.status(401).send({ auth: false, message: "No token provided." });}
    
    
    jwt.verify(token, RSA_PRIVATE_KEY, function(err, data) 
    {
        if (err)
        {

          return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
  
        }
    res.render("users", { users: users });
    });


 
});
router.get("/addnewmovie", async function (req, res, next) {
  res.render("createAccount");
});

router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  let movieData = await movieBL.getMovie(id);
  res.render("movie", { movie: movieData });
});
router.get("/edituser/:id", async function (req, res, next) {
  let id = req.params.id;
  let movieData = await movieBL.getMovie(id);
  res.render("editmovie", { movie: movieData });
});
router.post("/savedata", async function (req, res, next) {
  let obj = req.body;

  obj = {
    username: req.body.username,
    password: req.body.password,
  };


  await userBL.postUsers(obj);
  var usersData = await userBL.getUsersJson();
  let users=usersData.users
  res.render("users", { users: users });

});

module.exports = router;
