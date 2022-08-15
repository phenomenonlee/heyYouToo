const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const postRouter = require("./posts.routes");
const commentRouter = require("./comments.routes");
// const userRouter = require("./users.routes");

router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);
// router.use("/api/users", userRouter);
=======

//const postRouter = require("./posts.routes");
const commentRouter = require("./comments.routes");
const userRouter = require("./users.routes");

//router.use("/api/posts", postRouter);
router.use("/api/comments", commentRouter);
router.use("/api/users/", userRouter);
>>>>>>> 3a8a8b7a7588e41b55e2f7831e992c263183da4f

module.exports = router;
