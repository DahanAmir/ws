const restDAL = require("../DAL/restSubscriptionDAL");

const getSubscriptions = async () => {
  let resp = await restDAL.getSubscriptions();
  let SubscriptionsData = resp.data;
  return SubscriptionsData;
  //return usersData.map(x =>
  //   {
  //      return {id : x.id, name : x.name}
  //  })
};

const getsubScriptionMemberId = async (id) => {
  let resp = await restDAL.getsubScriptionMemberId(id);
  let ScriptionMemberData = resp.data;
  return ScriptionMemberData;
};
const getsubScriptionMovieId = async (id) => {
  let resp = await restDAL.getsubScriptionMovieId(id);
  let ScriptionMovieData = resp.data;
  return ScriptionMovieData;
};
const putMovie = async (obj) => {
  let resp = await restDAL.putMovie(obj);
  return resp;
};
const postScription = async (obj) => {
  let resp = await restDAL.postScription(obj);
  return resp;
};
module.exports = {
  getsubScriptionMemberId,
  getSubscriptions,
  getsubScriptionMovieId,
  putMovie,
  postScription,
};
