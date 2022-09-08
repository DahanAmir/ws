const movieMQ = require("../mongoosQuery/movieMQ");
const memberMQ = require("../mongoosQuery/memberMQ");
const subscriptionMQ = require("../mongoosQuery/subscriptionMQ");
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
      premiered: x.premiered.slice(0, 10),
    };
  });

  let id;
  for (let index = 0; index < movies.length; index++) {
    id = await movieMQ.createMovie(movies[index]);
  }

  return id;
};
const member = async function () {
  let resp = await memberDAL.getNember();
  let members = resp.data;
  let id;
  for (let index = 0; index < members.length; index++) {
    members[index].city = members[index].address.city;
    id = await memberMQ.createMember(members[index]);
  }
  return id;
};
const start = async function () {
  await memberMQ.deleteAll();
  await subscriptionMQ.deleteAll();
  await movieMQ.deleteAll();
  movieId = await movies();
  memberId = await member();
  mem = await memberMQ.getMembers();
  mov = await movieMQ.getMovies();
  for (let index = 0; index < mem.length; index++) {
    let obj = {
      movieId: mov[index]._id,
      memberId: mem[index]._id,
      date: now(),
    };
    await subscriptionMQ.createSubscript(obj);
    obj = {
      movieId: mov[index + 1]._id,
      memberId: mem[index]._id,
      date: now(),
    };
    await subscriptionMQ.createSubscript(obj);
    obj = {
      movieId: mov[index + 2]._id,
      memberId: mem[index]._id,
      date: now(),
    };
    await subscriptionMQ.createSubscript(obj);
  }

  //movie = await movieMQ.getmMvie(idmovie);
  //await subscriptionMQ.addSubscriptMovie(idmember, movie);
};
const sub = async function () {};

module.exports = {
  movies,
  member,
  start,
  sub,
};
