const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

// 댓글 조회
router.get("/:postId", commentsController.getComments);

//댓글 작성
router.post("/:postId", authMiddleware, commentsController.createComment);

// 댓글 수정
router.patch("/:commentId", authMiddleware, commentsController.updateComment);

// 댓글 삭제
router.delete("/:commentId", authMiddleware, commentsController.deleteComment);

module.exports = router;
