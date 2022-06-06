const mongoose = require("mongoose");

var SubscriptionSchema = new mongoose.Schema({
  movieId: { type: Object, required: true },
  memberId: { type: Object, required: true },
  date: { type: Date, default: Date.now },
});
SubscriptionSchema.index({ movieId: 1, memberId: 1 }, { unique: true });
module.exports = mongoose.model("subscriptions", SubscriptionSchema);
