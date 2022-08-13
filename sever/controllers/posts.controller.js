const PostsService = require("../services/posts.service");
const PostVerify = require("../verify/postsVerify");

const { Post } = require("../../models"); //  테스트 용

class PostsController {
    postsService = new PostsService();
    postVerify = new PostVerify();

    testDelete = async () => {
        await Post.destroy({
            where: { postId: 1 },
        });
        res.send();
    };

    findAllPost = async (req, res) => {
        const allPost = await this.postsService.findAllPost();

        res.status(200).json({ allPost });
    };

    createPost = async (req, res) => {
        const { secretKey, title, content } = req.body;
        // const { nickname, userId } = res.locals;
        const { nickname, userId } = { nickname: "hello", userId: 2 }; // 테스트 용

        const exsisBody = await this.postVerify.veerifyAllPost(
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
        // const { userId } = res.locals;
        const userId = 1; // 테스트 용

        const verifyPost = await this.postVerify.veerifyPost(userId, postId);

        const exsisConTentTile = await this.postVerify.veerifyUpdate(
            title,
            newContent
        );
        console.log(verifyPost);

        if (!verifyPost) {
            return res.status(400).json({
                errorMessage: "본인 게시글이 아닙니다.",
            });
        }
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
        // const { userId } = res.locals;
        const userId = 1; // 테스트 용

        const verifyPost = await this.postVerify.veerifyPost(userId, postId);

        const verifyPassword = await this.postVerify.verifyPassword(
            userId,
            password
        );

        if (!verifyPost) {
            return res.status(400).json({
                errorMessage: "본인 게시글이 아닙니다.",
            });
        }

        if (!verifyPassword) {
            return res.status(400).json({
                errorMessage: "비밀번호를 확인해주세요",
            });
        }

        await this.postsService.deletePost(postId);
        res.status(200).json();
    };
}

module.exports = PostsController;
