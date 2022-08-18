const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

// 미들웨어는 사용자가 로그인 했는지 검증을 해주고 검증이 완료되면 locals 안에 userId와 nickname을 넣어줌
const authMiddleware = require("../middleware/auth-middleware");

// 모든 게시물 조회
router.get("/", postsController.findAllPost);

// 게시물 작성
router.post("/", authMiddleware, postsController.createPost);

// 게시물 수정
// 수정할 게시물의  postId를 params로 받음
router.patch("/:postId", authMiddleware, postsController.updatePost);

// 게시물 삭제
// 삭제할 게시물의  postId를 params로 받음
router.delete("/:postId", authMiddleware, postsController.deletePost);

// 게시물 상세보기
// 상세보기 할 postId를 params로 받음
router.get("/:postId", authMiddleware, postsController.findOnePost);

// 게시글 좋아요
// 좋아요 할 postId를 params로 받음
router.post("/likes/:postId", authMiddleware, postsController.postLike);

// 게시글 좋아요 취소
// 좋아요 취소 할 postId를 params로 받음
router.delete("/unlikes/:postId", authMiddleware, postsController.postUnlike);

// 자기 게시글 조회
router.get("/my/post", authMiddleware, postsController.getMyPost);

module.exports = router;
