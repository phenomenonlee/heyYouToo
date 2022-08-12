const express = require("express");
const router = express.Router();

const MypageController = require("../controllers/mypage.controller");
const mypageController = new MypageController();

router.get("/mypage", mypageController /* .함수이름 */);

module.exports = router;
