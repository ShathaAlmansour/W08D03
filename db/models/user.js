// ريكواير للمونقوز
const mongoose = require("mongoose");
// انشاء سكيما فيها الايميل والباسورد وايضا الرول
const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});

// اكسبورت لليوزر
module.exports = mongoose.model("User", user);
