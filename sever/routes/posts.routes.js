const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

//게시물 조회
router.get("/", postsController /* .함수이름 */);

// 게시물 상세보기
router.get("/:postId", postsController);

// 게시물 작성
router.post("/", postsController);

// 게시물 수정
router.patch("/:postId", postsController);

// 게시물 삭제
router.delete("/:postId", postsController);

// 게시글 좋아요
router.patch("/likes/postId", postsController);

module.exports = router;
