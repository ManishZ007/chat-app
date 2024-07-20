const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const checkingUser = await User.findOne({ email: email });

    if (!checkingUser) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const createUser = await User.create({
        username,
        email,
        password: hashPassword,
      });
      if (!createUser) {
        res.json({ status: false, message: "ther is server problem" });
      } else {
        res.json({ status: true, createUser });
      }
    } else {
      res.json({
        status: false,
        message: "enter another email this email is present",
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.json({ status: false, message: "user not found" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        res.json({ status: true, user });
      } else {
        res.json({ status: false, message: "password is wrong" });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contacts = await User.find({ _id: { $ne: id } });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};
