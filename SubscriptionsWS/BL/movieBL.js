const moviesModel = require("../mongoose/moviesModel");

const deleteAll = async function () {
  moviesModel.find({}).remove().exec();
};
const getMovies = () => {
  return new Promise((resolve, reject) => {
    moviesModel.find({}, function (err, data) {
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
const updateMovie = function (obj) {
  return new Promise((resolve, reject) => {
    moviesModel.findByIdAndUpdate(obj._id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Updated !!");
      }
    });
  });
};

const getsubscriptions = async function () {
  return moviesModel.aggregate([
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "movieId",
        as: "subscriptions",
      },
    },
    
  ]);
};
/**
const getsubscriptions = async function (query) {
  return moviesModel.aggregate([
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "movieId",
        as: "movies",
      },
      $lookup: {
        from: "members",
        localField: "_id",
        foreignField: "$memberId",
        as: "members",
      },
      
    },

  ]);
};
 */
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
  getsubscriptions,
};
