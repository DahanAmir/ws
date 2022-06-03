const movieBL = require("./movieBL");
const memberBL = require("./memberBL");
const subscriptionBL = require("./subscriptionBL");
const memberDAL = require("../DAL/memberDAL");
const movieDAL = require("../DAL/movieDAL");

const movies = async function () {
  let resp = await movieDAL.getMovies();
  let movies = resp.data;
  var id;
  for (let index = 0; index < movies.length; index++) {
    id = movieBL.createMovie(movies[index]);
  }
  return id;
};
const member = async function () {
  let resp = await memberDAL.getNember();
  let members = resp.data;
  var id;
  for (let index = 0; index < members.length; index++) {
    id = await memberBL.createMember(members[index]);
    obj = { _id: id };
    subscriptionBL.createSubscript(obj);
  }
  return id;
};
const start = async function () {
  await memberBL.deleteAll();
  await subscriptionBL.deleteAll();
  await movieBL.deleteAll();
  idmovie = await movies();
  idmember = await member();
  movie = await movieBL.getmMvie(idmovie);
  Subscript = await subscriptionBL.getSubscript(idmember);
  await subscriptionBL.addSubscriptMovie(idmember, movie);
};
module.exports = {
  movies,
  member,
  start,
};
