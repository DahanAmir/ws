const axios = require("axios");

const getMovies = () => {
  return axios.get("http://localhost:8000/api/movie");
};

const getMovie = (id) => {
  return axios.get("http://localhost:8000/api/movie/" + id);
};
const putMovie = (obj) => {
  return axios({
   method: 'put',
   url: 'http://localhost:8000/api/movie',
   data: obj
 });
};
const postMovie = (obj) => {
  return axios({
   method: 'post',
   url: 'http://localhost:8000/api/movie',
   data: obj
 });
}

module.exports = { getMovie, getMovies,putMovie,postMovie };
