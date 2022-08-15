const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const authMiddleware = require("../middleware/auth-middleware");
const postsController = new PostsController();

//게시물 조회
router.get("/", postsController.findAllPost);

// 게시물 작성
router.post("/", authMiddleware, postsController.createPost);

// 게시물 수정
router.patch("/:postId", authMiddleware, postsController.updatePost);

// 게시물 삭제
router.delete("/:postId", authMiddleware, postsController.deletePost);

// 게시물 상세보기
router.get("/:postId", authMiddleware, postsController.findOnePost);

// 게시글 좋아요
router.post("/likes/:postId", authMiddleware, postsController.postLike);

// 게시글 좋아요 취소
router.delete("/unlikes/:postId", authMiddleware, postsController.postUnlike);

// 자기 게시글 조회
router.get("/my/post", authMiddleware, postsController.getMyPost);

module.exports = router;
