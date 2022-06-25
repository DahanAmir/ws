const restDAL = require("../DAL/restMovieDAL");

const getMovies = async () => {
  let resp = await restDAL.getMovies();
  let moviesData = resp.data;

  return moviesData;
};
const getSubscriptions = async () => {
  let resp = await restDAL.getSubscriptions();
  let subscriptionsData = resp.data;
  return subscriptionsData;
};

const getMovie = async (id) => {
  let resp = await restDAL.getMovie(id);
  let movieData = resp.data;
  return movieData;
};

const putMovie = async (obj) => {
  let resp = await restDAL.putMovie(obj);
  return resp;
};
const postMovie = async (obj) => {
  let resp = await restDAL.postMovie(obj);
  return resp;
};
module.exports = { getSubscriptions, getMovie, getMovies, putMovie, postMovie };
