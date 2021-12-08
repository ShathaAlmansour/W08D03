const mongoose = require("mongoose");

const task = new mongoose.Schema({
  name: { type: String },
  isDelete: { type: String, default: false },
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
module.exports = mongoose.model("Taskss", task);
