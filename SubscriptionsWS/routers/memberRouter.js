const express = require("express");
const memberBL = require("../BL/memberBL");
const subscriptionBL = require("../BL/subscriptionBL");
const router = express.Router();

router.route("/").get(async function (req, resp) {
  let users = await memberBL.getMembers();
  return resp.json(users);
});

router.route("/:id").get(async function (req, resp) {
  let id = req.params.id;
  let user = await memberBL.getMemberbyid(id);
  return resp.json(user);
});

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let id = await memberBL.createMember(obj);
  obj._id = id;
  let status = await subscriptionBL.createSubscript(obj);
  return resp.json(status);
});

router.route("/:id").put(async function (req, resp) {
  let obj = req.body;
  let id = req.params.id;

  let status = await memberBL.updateMember(id, obj);
  return resp.json(status);
});

router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;

  let status = await memberBL.deleteMember(id);
  status = await subscriptionBL.deleteSubscript(obj);

  return resp.json(status);
});

module.exports = router;
