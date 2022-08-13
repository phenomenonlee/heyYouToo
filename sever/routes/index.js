const express = require("express");
const router = express.Router();

const postRouter = require("./posts.routes");
const commentRouter = require("./comments.routes");
const userRouter = require("./users.routes");

router.get("/", (req, res) => {
    res.send("Hi");
});
router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);
router.use("/api/users/", userRouter);

module.exports = router;
