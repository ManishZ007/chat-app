const { register, login, getAllUser } = require("../controller/userController");

const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allUser/:id", getAllUser);

module.exports = router;
