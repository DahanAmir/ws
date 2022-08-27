const express = require("express");
const memberMQ = require("../mongoosQuery/memberMQ");
const subscriptionMQ = require("../mongoosQuery/subscriptionMQ");
const router = express.Router();
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;

router.route("/").get(async function (req, resp) {
  let users = await memberMQ.getMembers();
  //  let users = await memberMQ.getMembers();
  return resp.json(users);
});
router.route("/subscriptions").get(async function (req, resp) {
  let subscriptions = await memberMQ.getsubscriptions();
  //  let users = await memberMQ.getMembers();
  return resp.json(subscriptions);
});

router.route("/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    memberId = mongoose.Types.ObjectId(id);
    let member = await memberMQ.getMemberbyid(id);
    return resp.json(member);
  } else {
    return resp.json("is not objectId");
  }
});

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let status = await memberMQ.createMember(obj);
  return resp.json(status);
});
router.route("/:id").put(async function (req, resp) {
  let obj = req.body;
  let id = req.params.id;
  obj._id = id;
  let status = await memberMQ.updateMember(id, obj);
  return resp.json(status);
});
//////////////////////////////

router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    memberId = mongoose.Types.ObjectId(id);
    await memberMQ.deleteMember(id);
    query = { memberId: memberId };
    let status = await subscriptionMQ.deleteSubscripts(query);
    return resp.json(status);
  } else {
    return resp.json("is not objectId");
  }
});

module.exports = router;
