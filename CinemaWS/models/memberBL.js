const restDAL = require("../DAL/restMemberDAL");

const getMembers = async () => {
  let resp = await restDAL.getMembers();
  let usersData = resp.data;
  return usersData;
  //return usersData.map(x =>
  //   {
  //      return {id : x.id, name : x.name}
  //  })
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
  console.log(obj);

  let resp = await restDAL.putMember(obj);
  return resp;
};

module.exports = { getMembers, getMember,postMember,putMember };
