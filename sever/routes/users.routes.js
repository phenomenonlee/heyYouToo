const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

//회원가입임
router.post("/join", usersController.createUser);

//로그인임
router.post("/login", usersController.loginUser);

module.exports = router;
