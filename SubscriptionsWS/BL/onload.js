const movieBL = require("./movieBL");
const memberBL = require("./memberBL");
const subscriptionBL = require("./subscriptionBL");
const memberDAL = require("../DAL/memberDAL");
const movieDAL = require("../DAL/movieDAL");
const { now } = require("mongoose");

const movies = async function () {
  let resp = await movieDAL.getMovies();
  let movies = resp.data;
  movies = movies.map((x) => {
    return {
      name: x.name,
      genres: x.genres,
      image: x.image.medium,
      premiered: x.premiered,
    };
  });

  let id;
  for (let index = 0; index < movies.length; index++) {
    id = await movieBL.createMovie(movies[index]);
  }

  return id;
};
const member = async function () {
  let resp = await memberDAL.getNember();
  let members = resp.data;
  let id;
  for (let index = 0; index < members.length; index++) {
    console.log(members[index]);
    members[index].city = members[index].address.city;
    console.log(members[index]);
    id = await memberBL.createMember(members[index]);
  }
  return id;
};
const start = async function () {
  await memberBL.deleteAll();
  await subscriptionBL.deleteAll();
  await movieBL.deleteAll();
  movieId = await movies();
  memberId = await member();
  mem = await memberBL.getMembers();
  mov = await movieBL.getMovies();
  for (let index = 0; index < mem.length; index++) {
    obj = { movieId: mov[index]._id, memberId: mem[index]._id, date: now() };
    await subscriptionBL.createSubscript(obj);
    obj = {
      movieId: mov[index + 1]._id,
      memberId: mem[index]._id,
      date: now(),
    };
    await subscriptionBL.createSubscript(obj);
    obj = {
      movieId: mov[index + 2]._id,
      memberId: mem[index]._id,
      date: now(),
    };
    await subscriptionBL.createSubscript(obj);
  }

  //movie = await movieBL.getmMvie(idmovie);
  //await subscriptionBL.addSubscriptMovie(idmember, movie);
};
const sub = async function () {};

module.exports = {
  movies,
  member,
  start,
  sub,
};
