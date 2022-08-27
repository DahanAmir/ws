const express = require("express");
const movieMQ = require("../mongoosQuery/movieMQ");
const subscriptionMQ = require("../mongoosQuery/subscriptionMQ");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

router.route("/").get(async function (req, resp) {
  let movies = await movieMQ.getMovies();
  return resp.json(movies);
});
router.route("/subscriptions").get(async function (req, resp) {
  let subscriptions = await movieMQ.getsubscriptions();
  //  let users = await memberMQ.getMembers();
  return resp.json(subscriptions);
});
router.route("/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    movieId = mongoose.Types.ObjectId(id);
    let movie = await movieMQ.getMovie(id);
    return resp.json(movie);
  } else {
    return resp.json("is not objectId");
  }
});

router.route("/").post(async function (req, resp) {
  let obj = req.body;

  let status = await movieMQ.createMovie(obj);
  return resp.json(status);
});
router.route("/").put(async function (req, resp) {
  let obj = req.body;

  let status = await movieMQ.updateMovie(obj);
  return resp.json(status);
});
///

router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    movieId = mongoose.Types.ObjectId(id);
    await movieMQ.deleteMovie(id);
    query = { movieId: movieId };
    let status = await subscriptionMQ.deleteSubscripts(query);
    return resp.json(status);
  } else {
    return resp.json("is not objectId");
  }
});

module.exports = router;
