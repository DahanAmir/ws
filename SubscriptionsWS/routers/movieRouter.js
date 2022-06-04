const express = require("express");
const movieBL = require("../BL/movieBL");
const subscriptionBL = require("../BL/subscriptionBL");
const router = express.Router();

router.route("/").get(async function (req, resp) {
  let users = await movieBL.getmovies();
  return resp.json(users);
});

router.route("/:id").get(async function (req, resp) {
  let id = req.params.id;
  let user = await movieBL.getmMvie(id);
  return resp.json(user);
});

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let status = await movieBL.createMovie(obj);
  return resp.json(status);
});

router.route("/:id").put(async function (req, resp) {
  let obj = req.body;
  console.log(obj);
  let id = req.params.id;
  console.log(id);
  let status = await movieBL.updateMovie(id, obj);
  return resp.json(status);
});

router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;

  let status = await movieBL.deleteSubscript(id);

  return resp.json(status);
});

module.exports = router;
