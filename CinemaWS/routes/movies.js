const { response } = require("express");
var express = require("express");
var router = express.Router();
const movieBL = require("../models/movieBL");
var jwt = require("jsonwebtoken");
//const SubscriptionBL = require("../models/SubscriptionBL");
//
/* GET movie listing. */
router.get("/", async function (req, res, next) {
  token = req.token;

  const RSA_PRIVATE_KEY = "somekey";

  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, RSA_PRIVATE_KEY, async function (err, data) {
    // userid = data.userid;
    //check userid in DB

    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    //res.status(200).send(decoded);
    let moviesData = await movieBL.getMovies();
    res.render("movies", { movies: moviesData });
    // res.status(200).send([{name : 'car'},{name : 'phone'}]);
  });
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

  obj = {
    _id: obj._id,
    name: obj.name,
    genres: obj.genres,
    premiered: obj.premiered,
    image: obj.image,
  };

  await movieBL.putMovie(obj);
  let moviesData = await movieBL.getMovies();
  res.render("movies", { movies: moviesData });
});

module.exports = router;
