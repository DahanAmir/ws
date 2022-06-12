const express = require("express");
const movieBL = require("../BL/movieBL");
const subscriptionBL = require("../BL/subscriptionBL");
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

router.route("/").get(async function (req, resp) {
  let movies = await movieBL.getMovies();
  return resp.json(movies);
});

router.route("/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    movieId = mongoose.Types.ObjectId(id);
    let movie = await movieBL.getMovie(id);
    return resp.json(movie);
  } else {
    return resp.json("is not objectId");
  }
});

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  console.log(obj);

  let status = await movieBL.createMovie(obj);
  return resp.json(status);
});
router.route("/").put(async function (req, resp) {
  let obj = req.body;
  console.log(obj);

  let status = await movieBL.updateMovie(obj);
  return resp.json(status);
});
///

router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    movieId = mongoose.Types.ObjectId(id);
    await movieBL.deleteMovie(id);
    query = { movieId: movieId };
    let status = await subscriptionBL.deleteSubscripts(query);
    return resp.json(status);
  } else {
    return resp.json("is not objectId");
  }
});

module.exports = router;
