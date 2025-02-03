const mongoose = require("mongoose");
const Userschema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
});
module.exports = mongoose.model("User", Userschema);
