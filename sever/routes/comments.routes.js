const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments.controller");
const commentsController = new CommentsController();

// 댓글 조회
router.get("/:postId", commentsController /* .함수이름 */);

//댓글 작성
router.post("/:postId", commentsController);

// 댓글 수정
router.patch("/:postId/:commentId", commentsController);

// 댓글 삭제
router.delete("/:postId/:commentId", commentsController);

module.exports = router;
