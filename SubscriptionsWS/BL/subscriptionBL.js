const subscriptionModel = require("../mongoose/subscriptionModel");

const deleteAll = async function () {
  subscriptionModel.find({}).remove().exec();
};
//הצגת כל המנוים
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

const getquery = async function (query) {
  return new Promise((resolve, reject) => {
    subscriptionModel.find(query, function (err, data) {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
};
const getMembers = async function (query) {
  return subscriptionModel.aggregate([
    {
      $lookup: {
        from: "members",
        localField: "memberId",
        foreignField: "_id",
        as: "members",
      },
    },
  ]);
};
const getMovie = async function (query) {
  return subscriptionModel.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "movieId",
        foreignField: "_id",
        as: "movies",
      },
    },
  ]);
};
const getMovieandMember = async function () {
  



  return   subscriptionModel.aggregate([

    {
      $lookup: {
        from: "members",
        localField: "memberId",
        foreignField: "_id",
        as: "members",
        
      },
    },
 
   
    {
      $lookup: {
        from: "movies",
        localField: "movieId",
        foreignField: "_id",
        as: "movies",
      },
    }
  ]);
};

//יצירת מנוי של סרט וחבר
const createSubscript = function (obj) {
  return new Promise((resolve, reject) => {
    let subscription = subscriptionModel(obj);
    subscription.save(function (err, data) {
      if (err) {
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
};
//מחקית מנוי
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
const deleteSubscripts = function (query) {
  return new Promise((resolve, reject) => {
    subscriptionModel.deleteMany(query, function (err) {
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
  createSubscript,
  deleteSubscript,
  deleteAll,
  getquery,
  deleteSubscripts,
  getMembers,
  getMovie,
  getMovieandMember,
};
