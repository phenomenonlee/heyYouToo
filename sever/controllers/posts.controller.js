const PostsService = require("../services/posts.service");

class PostsController {
    postsService = new PostsService();

    createPost = async (req, res) => {
        const { secretKey, title, content } = req.body;
        const { nickname, userId } = res.locals;

        // verify 부분

        await this.postsService.createPost(
            secretKey,
            title,
            content,
            nickname,
            userId
        );

        res.status(201).json({ msg: "게시글 작성" });
    };
}

module.exports = PostsController;
