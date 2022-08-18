const PostsService = require("../services/posts.service");
const PostVerify = require("../verify/postsVerify");
const jwt = require("jsonwebtoken");

// const { Post } = require("../../models"); //  테스트 용

class PostsController {
    postsService = new PostsService();
    postVerify = new PostVerify();

    /* testDelete = async (req, res) => {
        await Post.destroy({
            where: { postId: 5 },
        });
        res.send();
    }; */

    findAllPost = async (req, res) => {
        const allPost = await this.postsService.findAllPost();

        res.status(200).json({ allPost });
    };

    createPost = async (req, res) => {
        const { secretKey, title, content } = req.body;
        const { nickname, userId } = res.locals;

        const exsisBody = await this.postVerify.veerifyBody(
            secretKey,
            title,
            content
        );

        if (!exsisBody) {
            return res.status(400).json({
                errorMessage: "입력값을 확인해주세요",
            });
        }

        await this.postsService.createPost(
            secretKey,
            title,
            content,
            nickname,
            userId
        );

        res.status(201).json();
    };

    updatePost = async (req, res) => {
        const { postId } = req.params;
        const { title, newContent } = req.body;
        const { userId } = res.locals;

        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }

        const verifyPost = await this.postVerify.veerifyPost(userId, postId);

        if (!verifyPost) {
            return res.status(400).json({
                errorMessage: "본인 게시글이 아닙니다.",
            });
        }
        const exsisConTentTile = await this.postVerify.veerifyUpdate(
            title,
            newContent
        );

        if (!exsisConTentTile) {
            return res.status(400).json({
                errorMessage: "입력값을 확인해주세요",
            });
        }

        await this.postsService.updatePost(title, newContent, postId);

        res.status(201).json();
    };

    deletePost = async (req, res) => {
        const { postId } = req.params;
        const { password } = req.body;
        const { userId } = res.locals;

        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }

        const verifyPost = await this.postVerify.veerifyPost(userId, postId);

        if (!verifyPost) {
            return res.status(400).json({
                errorMessage: "본인 게시글이 아닙니다.",
            });
        }

        const verifyPassword = await this.postVerify.verifyPassword(
            userId,
            password
        );

        if (!verifyPassword) {
            return res.status(400).json({
                errorMessage: "비밀번호를 확인해주세요",
            });
        }

        await this.postsService.deletePost(postId);
        res.status(200).json();
    };

    findOnePost = async (req, res) => {
        const { postId } = req.params;
        const { secretKey } = req.body;

        /*         const commentToken = jwt.sign(
            {
                postId,
            },
            "hohoho"
        );

        res.cookie("commentCookie", commentToken); */

        const verifysecretKey = await this.postVerify.verifysecretKey(
            secretKey,
            postId
        );
        if (!verifysecretKey) {
            return res
                .status(400)
                .json({ errorMessage: "비밀번호를 확인해주세요" });
        }

        const post = await this.postsService.findOnePost(postId);

        res.status(200).json(post);
    };

    postLike = async (req, res) => {
        const { postId } = req.params;
        const { userId } = res.locals;

        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }
        const Postlike = await this.postsService.postLike(postId, userId);

        if (!Postlike) {
            return res.status(400).json({
                errorMessage: "이미 좋아요 했습니다.",
            });
        }
        res.status(200).json();
    };

    postUnlike = async (req, res) => {
        const { postId } = req.params;
        const { userId } = res.locals;

        const exsisPost = await this.postVerify.exsisPost(postId);

        if (!exsisPost) {
            return res.status(400).json({
                errorMessage: "없는 게시글 입니다.",
            });
        }

        const postUnlike = await this.postsService.postUnlike(postId, userId);
        if (!postUnlike) {
            return res.status(400).json({
                errorMessage: "취소할 좋아요가 없습니다.",
            });
        }
        res.status(200).json();
    };

    getMyPost = async (req, res) => {
        const { userId } = res.locals;

        const MyPosts = await this.postsService.getMyPost(userId);

        res.status(200).json({ MyPosts });
    };
}

module.exports = PostsController;
