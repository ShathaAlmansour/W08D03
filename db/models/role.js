// عمل ريكواير للمونقوز
const mongoose = require("mongoose");

// سكيما للرول فيها الرول والبراميشن
const role = new mongoose.Schema({
  role: { type: String },
  permossion: { type: Array },
});
//   اكسبورت للرول
module.exports = mongoose.model("Role", role);
