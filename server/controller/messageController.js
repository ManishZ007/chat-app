const Message = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Message.find({
      users: { $all: [from, to] },
    }).sort({ updatedAt: 1 });

    const projectedMessage = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() == from,
        message: msg.message.text,
      };
    });

    res.json({ projectedMessage });
  } catch (error) {
    next(error);
  }
};
