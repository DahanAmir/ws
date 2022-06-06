const mongoose = require("mongoose");

var SubscriptionSchema = new mongoose.Schema({
  movieId: { type:String , required: true },
  memberId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
SubscriptionSchema.index({ movieId: 1, memberId: 1 }, { unique: true });
module.exports = mongoose.model("subscriptions", SubscriptionSchema);
