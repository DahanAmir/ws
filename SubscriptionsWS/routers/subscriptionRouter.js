const express = require("express");
const subscriptionBL = require("../BL/subscriptionBL");
const router = express.Router();
/* router.route("/all").get(async function (req, resp) {
  console.log("in")

  let users = await subscriptionBL.getSubscripts();
  console.log(users)

  return resp.json(users);
});
*/
router.route("/").get(async function (req, resp) {
  console.log("in")

  let subscrip = await subscriptionBL.getSubscripts();
  return resp.json(subscrip);
});

router.route("/:id").get(async function (req, resp) {
  console.log("hii");
  let id = req.params.id;
  let subscr = await subscriptionBL.getSubscript(id);
  console.log(subscr)
  return resp.json(subscr);
});

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let status = await subscriptionBL.createSubscript(obj);
  return resp.json(status);
});

router.route("/addMovie/:id").post(async function (req, resp) {
  let id = req.params.id;
  let movie = req.body.movie;
  console.log(id)
  console.log(movie);
  let status = await subscriptionBL.addSubscriptMovie(id,movie);
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
