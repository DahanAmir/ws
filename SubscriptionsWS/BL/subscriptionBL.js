const subscriptionModel = require("../mongoose/subscriptionModel");



const deleteAll= async function () {
  subscriptionModel.find({}).remove().exec();
}
const getSubscripts = function () {
  return new Promise((resolve, reject) => {
    subscriptionModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        console.log(data)
        resolve(data);
      }
    });
  });
};

const getSubscript = function (SubscriptId) {
  console.log(SubscriptId)

  console.log(SubscriptId)
  console.log(SubscriptId)
  return new Promise((resolve, reject) => {
    subscriptionModel.find({ _id: SubscriptId }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
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

const addSubscriptMovie = async function (id,movie) {
  console.log(id);
  console.log(id);
  console.log(id);

  let obj =await getSubscript(id)
  obj=obj[0]
  console.log("------------------------------------------------");
  console.log(obj);
  
  console.log(movie);
console.log("------------------------------------------------");

  return new Promise((resolve, reject) => {
    moviess=obj.movies

    if(!moviess.find(x=>x.name==movie.name)){
  obj.movies.push(movie)
}
console.log("------------------------------------------------");
console.log(obj);
console.log("------------------------------------------------");
    subscriptionModel.findOneAndUpdate(
      { _id: id },
      {movies:[obj.movies]}
            ,
      function (err,data) {
        if (err) {
          reject(err);
        } else {
          resolve(obj._id);
        }
      }
    );
  });
};
const updateSubscript = function (id, obj) {
 
  return new Promise((resolve, reject) => {
    subscriptionModel.findOneAndUpdate(
      id,
      obj,
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
  deleteAll
};
