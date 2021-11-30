const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String },
  isDelete: {type: String,default: false},
  task: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  
});
module.exports = mongoose.model("Task", taskSchema);

