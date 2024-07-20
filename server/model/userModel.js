const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ChatApp", { useNewUrlParser: true })
  .then(() => {
    console.log("MogoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
