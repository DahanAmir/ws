const express = require("express");
const memberBL = require("../BL/memberBL");
const subscriptionBL = require("../BL/subscriptionBL");
const router = express.Router();
const mongoose = require("mongoose");
const { quiet } = require("nodemon/lib/utils");
var ObjectId = require("mongoose").Types.ObjectId;
router.route("/").get(async function (req, resp) {
  let users = await memberBL.getMembers();
  return resp.json(users);
});

router.route("/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    memberId = mongoose.Types.ObjectId(id);
  let member = await memberBL.getMemberbyid(id);
  return resp.json(member);}
  else{
    return resp.json("is not objectId");

  }
});

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let status = await memberBL.createMember(obj);
  return resp.json(status);
});
router.route("/:id").put(async function (req, resp) {
  let obj = req.body;
  let id = req.params.id;
  obj._id=id
  let status = await memberBL.updateMember(id, obj);
  return resp.json(status);
});
//////////////////////////////


router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    memberId = mongoose.Types.ObjectId(id);
    await memberBL.deleteMember(id);
    query = { memberId: memberId };
 let status = await subscriptionBL.deleteSubscripts(query)
  return resp.json(status);
} else {
  return resp.json("is not objectId");
}

  
});

module.exports = router;
