const memberModel = require("../mongoose/memberModel");
const subscriptionModel = require("../mongoose/subscriptionModel");
const memberDAL = require("../DAL/memberDAL");

const subscriptionBL = require("./subscriptionBL");

const deleteAll = async function () {
  memberModel.find({}).remove().exec();
};

const getMembers = async function () {
  return new Promise((resolve, reject) => {
    memberModel.find(function (err, data) {
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
const onload = async function () {
  if (true) {
    memberModel.find({}).remove().exec();

    subscriptionModel.find({}).remove().exec();
    let resp = await memberDAL.getNember();
    let members = resp.data;
    var id;
    for (let index = 0; index < members.length; index++) {
      id = await createMember(members[index]);
      obj = { _id: id };
      subscriptionBL.createSubscript(obj);
    }
    return id;
  }
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

const createMember = function (obj) {
  if (obj.city) {
    city = obj.city;
  } else {
    city = obj.address.city;
  }
  return new Promise((resolve, reject) => {
    let member = memberModel({
      name: obj.name,
      email: obj.email,
      city: city,
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
          reject(err);
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

module.exports = {
  onload,
  getMembers,
  getMemberbyid,
  createMember,
  updateMember,
  deleteMember,
  getMember,
  deleteAll,
};
