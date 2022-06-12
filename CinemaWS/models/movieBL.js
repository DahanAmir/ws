const restDAL = require("../DAL/restMovieDAL");

const getMovies = async () => {
  let resp = await restDAL.getMovies();
  let moviesData = resp.data;
  return moviesData;
  //return usersData.map(x =>
  //   {
  //      return {id : x.id, name : x.name}
  //  })
};

const getMovie = async (id) => {
  let resp = await restDAL.getMovie(id);
  let movieData = resp.data;
  return movieData;
};
const putMovie = async (obj) => {
  console.log(obj)
  let resp = await restDAL.putMovie(obj);
  return resp;
};
const postMovie = async (obj) => {
  let resp = await restDAL.postMovie(obj);
  return resp;
};
module.exports = { getMovie, getMovies,putMovie,postMovie };
