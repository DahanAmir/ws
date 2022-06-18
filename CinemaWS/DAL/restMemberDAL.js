const axios = require("axios");

const getMembers = () => {
  return axios.get("http://localhost:8000/api/member");
};
const getSubscriptions = () => {
  return axios.get("http://localhost:8000/api/member/getSubscriptions");
};

const getMember = (id) => {
  return axios.get("http://localhost:8000/api/member/" + id);
};
const postMember = (obj) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/api/member",
    data: obj,
  });
};
const putMember = (obj) => {
  return axios({
    method: "put",
    url: "http://localhost:8000/api/member/" + obj._id,
    data: obj,
  });
};

module.exports = {
  getSubscriptions,
  getMembers,
  getMember,
  postMember,
  putMember,
};
