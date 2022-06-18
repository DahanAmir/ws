const { response } = require("express");
var express = require("express");
var router = express.Router();
const memberBL = require("../models/memberBL");
const jwt = require("jsonwebtoken");

/* GET members listing. */
router.get("/", async function (req, res, next) {
  var token = req.token;

  const RSA_PRIVATE_KEY = "somekey";
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, RSA_PRIVATE_KEY, async function (err, data) {
    userid = data.userid;
    //check userid in DB

    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    else {
      //res.status(200).send(decoded);
      let membersData = await memberBL.getMembers();
      res.render("members", { members: membersData });
    }
  });
});
router.get("/addnewMember", async function (req, res, next) {
  var token = req.token;

  res.render("userData");
});

router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  let memberData = await memberBL.getMember(id);
  res.render("member", { member: memberData });
});
router.get("/editMember/:id", async function (req, res, next) {
  let id = req.params.id;
  let memberData = await memberBL.getMember(id);
  res.render("editMember", { member: memberData });
});
router.post("/savedata", async function (req, res, next) {
  let obj = req.body;
  obj = { _id: obj._id, name: obj.name, email: obj.email, city: obj.city };
  await memberBL.putMember(obj);
  let membersData = await memberBL.getMembers();
  res.render("members", { members: membersData });
});

module.exports = router;
