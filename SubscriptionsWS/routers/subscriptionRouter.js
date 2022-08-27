const express = require("express");
const subscriptionMQ = require("../mongoosQuery/subscriptionMQ");
const memberMQ = require("../mongoosQuery/memberMQ");
const movieMQ = require("../mongoosQuery/movieMQ");
const router = express.Router();
const mongoose = require("mongoose");
var ObjectId = require("mongoose").Types.ObjectId;
var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
router.route("/").get(async function (req, resp) {
  let subscrip = await subscriptionMQ.getSubscripts();

  //  let subscrip = await subscriptionMQ.getSubscripts();
  return resp.json(subscrip);
});
router.route("/MovieByMember").get(async function (req, resp) {
  let movies1 = await movieMQ.getMovies();
  let members = await memberMQ.getsubscriptions();
  var obj = [];
  members.forEach((element) => {
    if (element.movies.length != 0) {
      element.movies.forEach((x) => {
        movies1.forEach((y) => {
          if (y._id.toString() == x.movieId.toString()) {
            x.movieId = y;
            x.date = x.date.toLocaleDateString("he-IL");
            delete x._id;
            delete x.memberId;
          }
        });
      });
      obj.push(element);
    }
  });

  return resp.json(obj);
});

router.route("/MemberByMovie").get(async function (req, resp) {
  let allmembers = await memberMQ.getMembers();
  let memberByMovie = await movieMQ.getsubscriptions();
  var obj = [];
  memberByMovie.forEach((element) => {
    if (element.members.length != 0) {
      element.members.forEach((x) => {
        allmembers.forEach((y) => {
          if (y._id.toString() == x.memberId.toString()) {
            x.memberId = y;
            x.date = x.date.toLocaleDateString("he-IL");
            delete x._id;
            delete x.movieId;
          }
        });
      });
      obj.push(element);
    }
  });

  return resp.json(obj);
});

router.route("/memberId/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    memberId = mongoose.Types.ObjectId(id);
    query = { memberId: memberId };
    let member = await subscriptionMQ.getquery(query);
    return resp.json(member);
  } else {
    return resp.json("is not objectId");
  }
});
router.route("/movieId/:id").get(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    movieId = mongoose.Types.ObjectId(id);
    query = { movieId: movieId };
    let movies = await subscriptionMQ.getquery(query);
    return resp.json(movies);
  } else {
    return resp.json("is not objectId");
  }
});
router.route("/:id").delete(async function (req, resp) {
  let id = req.params.id;
  if (ObjectId.isValid(id)) {
    id = mongoose.Types.ObjectId(id);
    let status = await subscriptionMQ.deleteSubscript(id);
    return resp.json(status);
  } else {
    return resp.json(subscrips);
  }
});
////////////////////////

router.route("/").post(async function (req, resp) {
  let obj = req.body;
  let status = await subscriptionMQ.createSubscript(obj);
  return resp.json(status);
});

module.exports = router;
