const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    loginAt: { type: Date },
    logoutAt: { type: Date },
    lastActiveAt: { type: Date },
  },
  { timestamps: true },
);

// Automatically set login + lastActive on creation
userSessionSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.loginAt) this.loginAt = now;
  if (!this.lastActiveAt) this.lastActiveAt = now;
  next();
});

// Automatically refresh lastActiveAt on any update
userSessionSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};

  const $set = update.$set || (update.$set = {});
  if (!$set.lastActiveAt) {
    $set.lastActiveAt = new Date();
  }

  this.setUpdate(update);
  next();
});

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = { UserSession };
