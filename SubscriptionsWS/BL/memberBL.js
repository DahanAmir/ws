const memberModel = require("../mongoose/memberModel");

const deleteAll = async function () {
  memberModel.find({}).remove().exec();
};

const getMembers = async function () {
  return new Promise((resolve, reject) => {
    memberModel.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const getMember = async function (id) {
  return new Promise((resolve, reject) => {
    memberModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
const getMemberbyid = function (id) {
  return new Promise((resolve, reject) => {
    memberModel.findById(id, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
////

const createMember = function (obj) {
  return new Promise((resolve, reject) => {
    let member = memberModel({
      name: obj.name,
      email: obj.email,
      city: obj.city,
    });

    member.save(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(member._id);
      }
    });
  });
};

const updateMember = function (id, obj) {
  return new Promise((resolve, reject) => {
    memberModel.findByIdAndUpdate(
      id,
      {
        name: obj.name,
        email: obj.email,
        city: obj.city,
      },
      function (err) {
        if (err) {
          reject(err.message);
        } else {
          resolve("Updated !!");
        }
      }
    );
  });
};

const deleteMember = function (id) {
  return new Promise((resolve, reject) => {
    memberModel.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("Deleted !!");
      }
    });
  });
};
const getsubscriptions = async function (query) {
  return memberModel.aggregate([
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "memberId",
        as: "movies",
      },
    },
  ]);
};

module.exports = {
  getMembers,
  getMemberbyid,
  createMember,
  updateMember,
  deleteMember,
  getMember,
  deleteAll,
  getsubscriptions,
};
