const express = require("express");
const subscriptionBL = require("../BL/subscriptionBL");
const movieBL = require("../BL/movieBL");
const router = express.Router();

router.route("/").get(async function (req, resp) {
  let subscrip = await subscriptionBL.getSubscripts();
  return resp.json(subscrip);
});



router.route("/query").get(async function (req, resp) {
  let obj = req.query;

  let subscrips = await subscriptionBL.getallSubscriptbyId(obj);

  return resp.json(subscrips);
});
router.route("/memberId").get(async function (req, resp) {
  let memberId = req.body;
  let member = await subscriptionBL.getmemberId(memberId);

  return resp.json(member);
});
router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let status = await subscriptionBL.createSubscript(obj);
  return resp.json(status);
});

router.route("/addMovie/:id").post(async function (req, resp) {
  let id = req.params.id;
  let movie = req.body.movie;
  let status = await subscriptionBL.addSubscriptMovie(id, movie);
  return resp.json(status);
});

router.route("/delete/:id").delete(async function (req, resp) {
  let id = req.params.id;
  let movie = req.body.movie;
  let status = await subscriptionBL.delSubscriptMovie(id, movie);
  return resp.json(status);
});

router.route("/:id").put(async function (req, resp) {
  let obj = req.body;
  let id = req.params.id;

  let status = await subscriptionBL.updateSubscript(id, obj);
  return resp.json(status);
});

router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;
  let status = await subscriptionBL.deleteSubscript(id);
  return resp.json(status);
});

module.exports = router;
