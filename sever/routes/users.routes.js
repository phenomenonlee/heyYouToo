const express = require("express");
const router = express.Router();
const loginCheck = require("../middleware/loginCheck")
const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

//회원가입임
router.post("/join", loginCheck ,usersController.createUser);

//로그인임
router.post("/login", loginCheck ,usersController.loginUser);

module.exports = router;
