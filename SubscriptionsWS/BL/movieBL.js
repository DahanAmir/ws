const moviesModel = require("../mongoose/moviesModel");
const movieDAL = require("../DAL/movieDAL");

const deleteAll = async function () {
  moviesModel.find({}).remove().exec();
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
moviesModel.create( obj,function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(movie._id);
      }
    });
  });
};

const updateMovie = function (id, obj) {
  console.log(obj)
  //obj=JSON.parse(obj)
  console.log(obj)

  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndUpdate(
      id,
        obj
      ,
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
  
  getmovies,
  getmMvie,
  createMovie,
  updateMovie,
  deleteSubscript,
  deleteAll,
};
