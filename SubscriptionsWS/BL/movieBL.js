const moviesModel = require("../mongoose/moviesModel");

const deleteAll = async function () {
  moviesModel.find({}).remove().exec();
};
const getMovies = () => {
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
const getMovie = function (id) {
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
    moviesModel.create(obj, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data._id);
      }
    });
  });
};
const updateMovie = function (id, obj) {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Updated !!");
      }
    });
  });
};

const deleteMovie = function (id) {
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
///////////////////////

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
  deleteAll,
};
