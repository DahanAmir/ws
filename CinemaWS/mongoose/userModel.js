const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: String,
  password: String,
});

module.exports = mongoose.model("user", UserSchema);
