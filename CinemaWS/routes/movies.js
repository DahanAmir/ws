const { response } = require("express");
var express = require("express");
var router = express.Router();
const movieBL = require("../models/movieBL");
const jwt = require('jsonwebtoken');
const secret = require("../configs/secret")
const RSA_PRIVATE_KEY=secret.secret()


router.get("/", async function (req, res, next) {
  token =  req.query.token 
  let RSA_PRIVATE_KEY=secret.secret()
  var moviesData = await movieBL.getMovies();


  if (!token)
  {return res.status(401).send({ auth: false, message: "No token provided." });}
    
    
    jwt.verify(token, RSA_PRIVATE_KEY, function(err, data) 
    {
        if (err)
        {

          return res
          .status(500)
          .send({ auth: false, message: "Failed to authenticate token." });
  
        }
    res.render("movies", { movies: moviesData });
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
