const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.controller");
const usersController = new UsersController();

router.post("/join");
router.post("/login");
router.get("/logout");

module.exports = router;
