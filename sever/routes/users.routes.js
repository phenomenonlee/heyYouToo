const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.post("/join", usersController /*.함수이름*/);
router.post("/login", usersController);
router.get("/logout", usersController);

module.exports = router;
