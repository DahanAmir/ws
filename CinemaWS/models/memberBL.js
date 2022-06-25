const restDAL = require("../DAL/restMemberDAL");

const getMembers = async () => {
  let resp = await restDAL.getMembers();
  let usersData = resp.data;
  return usersData;
};
const getSubscriptions = async () => {
  let resp = await restDAL.getSubscriptions();
  let subscriptionsData = resp.data;
  return subscriptionsData;
};

const getMember = async (id) => {
  let resp = await restDAL.getMember(id);
  let userData = resp.data;
  return userData;
};
const postMember = async (obj) => {
  let resp = await restDAL.postMember(obj);
  return resp;
};
const putMember = async (obj) => {
  let resp = await restDAL.putMember(obj);
  return resp;
};
const deletMember = async (id) => {
  let resp = await restDAL.deletMember(id);
  return resp;
};

module.exports = {
  getSubscriptions,
  getMembers,
  getMember,
  postMember,
  putMember,
  deletMember,
};
