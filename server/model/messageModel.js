const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/ChatApp", { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log({ message: error.message });
  });

const messageSchema = new mongoose.Schema({
  message: {
    text: {
      type: String,
      required: true,
    },
  },
  users: Array,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
