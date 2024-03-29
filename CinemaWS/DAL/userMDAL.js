const userModel = require("../mongoose/userModel");

const deleteAll = async function () {
  userModel.find({}).remove().exec();
};

const getUsers = async function () {
  return new Promise((resolve, reject) => {
    userModel.find(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const getUserId = async function (id) {
  return new Promise((resolve, reject) => {
    userModel.find({ id }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const login = function (obj) {
  return new Promise((resolve, reject) => {
    userModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

////

const createUser = function (obj) {
  return new Promise((resolve, reject) => {
    let user = userModel({
      username: obj.userName,
      password: obj.password,
    });

    user.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data._id);
      }
    });
  });
};

const updateUser = function (obj) {
  return new Promise((resolve, reject) => {
    userModel.findByIdAndUpdate(obj._id, obj, function (err) {
      if (err) {
        reject(err.message);
      } else {
        resolve("Updated !!");
      }
    });
  });
};

const deleteUser = function (id) {
  return new Promise((resolve, reject) => {
    userModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !!");
      }
    });
  });
};
module.exports = {
  login,
  deleteUser,
  deleteAll,
  updateUser,
  getUsers,
  createUser,
  getUserId,
};
