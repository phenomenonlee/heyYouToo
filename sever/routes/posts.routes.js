const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

//게시물 조회
router.get("/");

// 게시물 상세보기
router.get("/:postId");

// 게시물 작성
router.post("/", postsController.createPost);

// 게시물 수정
router.patch("/:postId");

// 게시물 삭제
router.delete("/:postId");

// 게시글 좋아요
router.patch("/likes/postId");

// 자기 게시글 조회
router.get("/my");

module.exports = router;
