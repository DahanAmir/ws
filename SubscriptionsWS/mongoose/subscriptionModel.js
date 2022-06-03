const mongoose = require("mongoose");
const MovieSchema = require("./moviesModel");

var SubscriptionSchema = new mongoose.Schema({
  movies: [MovieSchema.schema],
});

module.exports = mongoose.model("subscriptions", SubscriptionSchema);
