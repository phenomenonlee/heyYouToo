const express = require("express");
const router = express.Router();
const path = require("path");

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

//회원가입임
router.post("/join", usersController.createUser);

// router.get("/join", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "..", "..", "signup.html"));
// });

//로그인임
router.post("/login", usersController.loginUser);
// router.get("/login", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "..", "..", "signin.html"));
// });

module.exports = router;
