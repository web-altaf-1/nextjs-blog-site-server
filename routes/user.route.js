const express = require("express");
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.findUserByEmail);
router.get("/me", verifyToken, userController.getMe);
router.get("/users", verifyToken, userController.getAllUsers);
router.get("/user/:email", verifyToken, userController.getUserByEmail);


module.exports = router;