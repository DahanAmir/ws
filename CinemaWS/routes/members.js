const { response } = require("express");
var express = require("express");
var router = express.Router();
const memberBL = require("../models/memberBL");

/* GET members listing. */
router.get("/", async function (req, res, next) {
  let membersData = await memberBL.getMembers();
  res.render("members", { members: membersData });
});
router.get("/addnewMember", async function (req, res, next) {
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
  obj={ _id:obj._id, name: obj.name,    email: obj.email,    city: obj.city,}
  await memberBL.putMember(obj);
 let membersData = await memberBL.getMembers();
 res.render("members", { members: membersData });
});

module.exports = router;
