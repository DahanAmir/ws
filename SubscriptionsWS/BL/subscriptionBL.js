const Logger = require("nodemon/lib/utils/log");
const subscriptionModel = require("../mongoose/subscriptionModel");

const deleteAll = async function () {
  subscriptionModel.find({}).remove().exec();
};
const getSubscripts = function () {
  return new Promise((resolve, reject) => {
    subscriptionModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getSubscript = function (SubscriptId) {

  return new Promise((resolve, reject) => {
    subscriptionModel.find({ _id: SubscriptId }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data[0]);
      }
    });
  });
};

const createSubscript = function (obj) {
  return new Promise((resolve, reject) => {
    let subscription = subscriptionModel(obj);

    subscription.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(subscription._id);
      }
    });
  });
};

const addSubscriptMovie = async function (id, movie) {
  let obj = await getSubscript(id);
  obj = obj;
  return new Promise((resolve, reject) => {
    moviess = obj.movies;
    if (!moviess.find((x) => x.name == movie.name)) {
      obj.movies.push(movie);
      subscriptionModel.findOneAndUpdate(
        { _id: id },
        { movies: obj.movies },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(obj._id);
          }
        }
      );
    }
    else{
      resolve("The movie is in the subscriber");
    }
    
  });
};


const delSubscriptMovie = async function (id, movie) {
  console.log(movie);
  let obj = await getSubscript(id);
  obj = obj;
  return new Promise((resolve, reject) => {
    moviess = obj.movies;
    if (moviess.find((x) => x.name == movie.name)) {
      obj.movies=obj.movies.filter(x => x.name!=movie.name);
      subscriptionModel.findOneAndUpdate(
        { _id: id },
        { movies: obj.movies },
        function (err, data) {
          if (err) {
            reject(err);
          } else {
            resolve(obj._id);
          }
        }
      );
    }
    else{
      resolve("The movie is not in the subscriber");
    }
    
  });
};
const updateSubscript = function (id, obj) {
  return new Promise((resolve, reject) => {
    subscriptionModel.findOneAndUpdate(id, obj, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Updated !!");
      }
    });
  });
};

const deleteSubscript = function (id) {
  return new Promise((resolve, reject) => {
    subscriptionModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !!");
      }
    });
  });
};

module.exports = {
  getSubscripts,
  getSubscript,
  createSubscript,
  updateSubscript,
  deleteSubscript,
  addSubscriptMovie,
  deleteAll,
  delSubscriptMovie
};
