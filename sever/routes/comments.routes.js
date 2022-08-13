const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

// 댓글 조회
router.get("/:postId");

//댓글 작성
router.post("/:postId");

// 댓글 수정
router.patch("/:postId/:commentId");

// 댓글 삭제
router.delete("/:postId/:commentId");

module.exports = router;
