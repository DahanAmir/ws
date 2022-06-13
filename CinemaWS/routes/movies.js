const { response } = require("express");
var express = require("express");
var router = express.Router();
const movieBL = require("../models/movieBL");

const SubscriptionBL = require("../models/SubscriptionBL");

/* GET movie listing. */
router.get("/", async function (req, res, next) {
  let moviesData = await movieBL.getMovies();
  let Subscription = await SubscriptionBL.getSubscriptions;
  res.render("movies", { movies: moviesData });
});
router.get("/addnewmovie", async function (req, res, next) {
  res.render("userData");
});

router.get("/:id", async function (req, res, next) {
  let id = req.params.id;
  let movieData = await movieBL.getMovie(id);
  res.render("movie", { movie: movieData });
});
router.get("/editMovie/:id", async function (req, res, next) {
  let id = req.params.id;
  let movieData = await movieBL.getMovie(id);
  res.render("editmovie", { movie: movieData });
});
router.post("/savedata", async function (req, res, next) {
  let obj = req.body;
  console.log(obj);

  obj = {
    _id: obj._id,
    name: obj.name,
    genres: obj.genres,
    premiered: obj.premiered,
    image: obj.image,
  };
  console.log(obj);

  await movieBL.putMovie(obj);
  let moviesData = await movieBL.getMovies();
  res.render("movies", { movies: moviesData });
});

module.exports = router;
