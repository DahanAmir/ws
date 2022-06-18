const mongoose = require("mongoose");

var SubscriptionSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, required: true,ref:"movies" },
  memberId: { type: mongoose.Schema.Types.ObjectId, required: true,ref:"members" },
  date: { type: Date, default: Date.now },
});
SubscriptionSchema.index({ movieId: 1, memberId: 1 }, { unique: true });
module.exports = mongoose.model("subscriptions", SubscriptionSchema);
