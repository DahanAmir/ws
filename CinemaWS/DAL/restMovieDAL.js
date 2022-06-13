const axios = require("axios");

const getMovies = () => {
  return axios.get("http://localhost:8000/api/movie");
};
const getSubscriptions = () => {
  return axios.get("http://localhost:8000/api/movie/subscriptions");
};

const getMovie = (id) => {
  return axios.get("http://localhost:8000/api/movie/" + id);
};
const putMovie = (obj) => {
  return axios({
    method: "put",
    url: "http://localhost:8000/api/movie",
    data: obj,
  });
};
const postMovie = (obj) => {
  return axios({
    method: "post",
    url: "http://localhost:8000/api/movie",
    data: obj,
  });
};

module.exports = { getSubscriptions, getMovie, getMovies, putMovie, postMovie };
