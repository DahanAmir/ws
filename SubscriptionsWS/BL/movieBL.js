const moviesModel = require("../mongoose/moviesModel");
const movieDAL = require("../DAL/movieDAL");

const deleteAll = async function () {
  moviesModel.find({}).remove().exec();
};

const onload = async function () {
  if (true) {
    moviesModel.find({}).remove().exec();
    let resp = await movieDAL.getMovies();
    let movies = resp.data;
    var id;
    for (let index = 0; index < movies.length; index++) {
      id = createMovie(movies[index]);
    }
    return id;
  }
};
const getmovies = () => {
  return new Promise((resolve, reject) => {
    moviesModel.find(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getmMvie = function (id) {
  return new Promise((resolve, reject) => {
    moviesModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const createMovie = function (obj) {
  return new Promise((resolve, reject) => {
    let movie = moviesModel({
      name: obj.name,
      genres: obj.genres,
      image: obj.image.medium,
      premiered: obj.premiered,
    });

    movie.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(movie._id);
      }
    });
  });
};

const updateMovie = function (id, obj) {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndUpdate(
      id,
      {
        name: obj.Name,
        genres: obj.genres,
        image: obj.image,
        premiered: premiered,
      },
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve("Updated !!");
        }
      }
    );
  });
};

const deleteSubscript = function (id) {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !!");
      }
    });
  });
};

module.exports = {
  onload,
  getmovies,
  getmMvie,
  createMovie,
  updateMovie,
  deleteSubscript,
  deleteAll,
};
