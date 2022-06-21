const axios = require("axios");

const getSubscriptions = () => {
  return axios.get("http://localhost:8000/api/subscription");
};

const getsubScriptionMovieId = (id) => {
  return axios.get("http://localhost:8000/api/subscription/movieId/" + id);
};
const getsubScriptionMemberId = (id) => {
  return axios.get("http://localhost:8000/api/subscription/memberId/" + id);
};
const deletesubScription = (id) => {
  return axios.delete("http://localhost:8000/api/subscription/" + id);
};
const postScription = (obj) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/api/subscription",
    data: obj,
  });
};
const getMoviesByMembers = () => {
  return axios.get("http://localhost:8000/api/subscription/MovieByMember");
};


module.exports = {
  getSubscriptions,
  getsubScriptionMovieId,
  getsubScriptionMemberId,
  deletesubScription,
  postScription,
  getMoviesByMembers
};
