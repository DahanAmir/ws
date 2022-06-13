const express = require("express");
const subscriptionBL = require("../BL/subscriptionBL");
const memberBL = require("../BL/memberBL");
const movieBL = require("../BL/movieBL");
const router = express.Router();
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
router.route("/").get(async function (req, resp) {
  let subscrip = await subscriptionBL.getSubscripts();

  //  let subscrip = await subscriptionBL.getSubscripts();
  return resp.json(subscrip);
});
router.route("/MovieandMember").get(async function (req, resp) {
  let MovieandMember = await subscriptionBL.getMovieandMember();

  return resp.json(MovieandMember);
});

router.route("/getMembers").get(async function (req, resp) {
  let Members = await subscriptionBL.getMembers();

  return resp.json(Members);
});
router.route("/getMovie").get(async function (req, resp) {
  let Movies = await subscriptionBL.getMovie();

  return resp.json(Movies);
});
router.route("/memberId/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    memberId = mongoose.Types.ObjectId(id);
    query = { memberId: memberId };
    let member = await subscriptionBL.getquery(query);
    return resp.json(member);
  } else {
    return resp.json("is not objectId");
  }
});
router.route("/movieId/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    movieId = mongoose.Types.ObjectId(id);
    query = { movieId: movieId };
    let movies = await subscriptionBL.getquery(query);
    return resp.json(movies);
  } else {
    return resp.json("is not objectId");
  }
});
router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    id = mongoose.Types.ObjectId(id);
    let status = await subscriptionBL.deleteSubscript(id);
    return resp.json(status);
  } else {
    return resp.json(subscrips);
  }
});
////////////////////////

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let status = await subscriptionBL.createSubscript(obj);
  return resp.json(status);
});

module.exports = router;
