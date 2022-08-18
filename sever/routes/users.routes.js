const express = require("express");
const router = express.Router();
const path = require("path");

const loginCheck = require("../middleware/loginCheck");
const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

//회원가입
router.post("/join", loginCheck, usersController.createUser);


//로그인
router.post("/login", loginCheck, usersController.loginUser);

//회원가입시 아이디 중복체크 버튼용
router.post("/checkUser", usersController.checkUser);

module.exports = router;


//라우터에서는 각 메소드별, URL별로 조건에 맞는 기능이 작동할 수 있도록
//코드를 이동 시켜주는 역할.