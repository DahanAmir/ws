const { response } = require("express");
var express = require("express");
var router = express.Router();
const SubscriptionBL = require("../models/SubscriptionBL");
const jwt = require("jsonwebtoken");
const secret = require("../configs/secret")
const RSA_PRIVATE_KEY=secret.secret()
/* GET members listing. */
router.get("/", async function (req, res, next) {
  console.log("membersData");

  let SubscriptionData = await SubscriptionBL.getMoviesByMembers();
  console.log(SubscriptionData[1]);
  res.render("moviesByMembers", { subscription: SubscriptionData });
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

router.get("/moviess", async function (req, res, next) {
  console.log("membersData");

  let membersData = await SubscriptionBL.getMoviesByMembers();

  
  res.render("moviesByMembers", { members: membersData });
});

module.exports = router;
