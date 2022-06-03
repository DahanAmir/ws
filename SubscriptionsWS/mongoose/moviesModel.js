const mongoose = require("mongoose");

let MovieSchema = new mongoose.Schema({
  name: String,
  genres: [String],
  image: String,
  premiered: Date 
});

module.exports = mongoose.model("movies", MovieSchema);
