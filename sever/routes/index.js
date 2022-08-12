const express = require("express");
const router = express.Router();

const postRouter = require("./posts.routes");
const commentRouter = require("./comments.routes");
const userRouter = require("./users.routes");
const mypageRouter = require("./mypage.routes");

router.use("/posts", postRouter);
router.use("/comments", commentRouter);
router.use("/", userRouter);
router.use("/mypage", mypageRouter);

module.exports = router;
